/**
 * @description 静态资源迁移执行器：源站资源 -> 自有 COS/CDN，并全量替换源码里的域名
 *
 * 用法：
 *   node script/migrate-cdn/migrate-cdn.js --upload      # 下载源站资源 -> 上传自有 COS（幂等）
 *   node script/migrate-cdn/migrate-cdn.js --verify      # 校验自有 CDN 上资源可访问且与源站一致
 *   node script/migrate-cdn/migrate-cdn.js --replace     # 全量替换源码中的域名
 *   node script/migrate-cdn/migrate-cdn.js --all         # 上述三步依次执行
 *
 * 可选参数：
 *   --env-file <path>   指定读取 COS 凭证的 .env 文件（默认按 DEFAULT_ENV_FILES 顺序探测）
 *   --only <substr>     只处理 key 中包含该子串的资源（失败重试用）
 *   --force             即使目标已存在也重新上传
 *   --dry-run           只打印将要做什么，不上传、不改文件
 *
 * 凭证来源（优先级从高到低）：
 *   1. 进程环境变量 TENCENT_COS_SECRET_ID / SECRET_KEY / BUCKET / REGION
 *   2. --env-file 指定的文件
 *   3. DEFAULT_ENV_FILES 探测到的第一个存在的文件
 *
 * 设计要点：
 * - 幂等：上传前先 HEAD 目标 CDN，已存在且 content-length 与源站一致就跳过，可反复执行。
 * - 上传与替换分两步（不是边传边改）：中途失败时不会留下「域名换了但资源没传上去」的半成品。
 */
const fs = require('fs');
const path = require('path');
const os = require('os');

const { uploadCOSFile } = require('t-comm');

const {
  SOURCE_HOST,
  TARGET_HOST,
  ROOT,
  RESOURCE_KEYS,
  CONTENT_TYPE_MAP,
  REPLACE_EXCLUDE,
  WALK_IGNORE_DIRS,
  TEXT_EXTENSIONS,
} = require('./config');


/** 默认探测的 .env 文件（本仓库没有 COS 凭证，回落到 koa-blog-end 的服务端配置） */
const DEFAULT_ENV_FILES = [
  path.resolve(ROOT, '.env.local'),
  path.resolve(ROOT, '../koa-blog-end/packages/server/.env.local'),
];

/** 下载缓存目录，放系统临时目录避免污染仓库 */
const CACHE_DIR = path.join(os.tmpdir(), 'press-ui-cdn-migrate');

const REQUEST_TIMEOUT_MS = 60 * 1000;


function parseArgs(argv) {
  const args = {
    upload: false,
    verify: false,
    replace: false,
    force: false,
    dryRun: false,
    envFile: '',
    only: '',
  };

  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (item === '--upload') args.upload = true;
    else if (item === '--verify') args.verify = true;
    else if (item === '--replace') args.replace = true;
    else if (item === '--all') {
      args.upload = true;
      args.verify = true;
      args.replace = true;
    } else if (item === '--force') args.force = true;
    else if (item === '--dry-run') args.dryRun = true;
    else if (item === '--env-file') {
      i += 1;
      args.envFile = argv[i] || '';
    } else if (item === '--only') {
      i += 1;
      args.only = argv[i] || '';
    }
  }

  // 什么都不传时默认只做上传，避免手滑直接改源码
  if (!args.upload && !args.verify && !args.replace) {
    args.upload = true;
  }
  return args;
}


/**
 * 极简 .env 解析
 *
 * 不用 dotenv 的 config()：它会把变量写进 process.env 并跳过已存在的 key，
 * 这里需要「进程环境变量优先」的语义，自己解析更可控。
 */
function parseEnvFile(filePath) {
  const result = {};
  if (!filePath || !fs.existsSync(filePath)) return result;

  const content = fs.readFileSync(filePath, 'utf8');
  content.split('\n').forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) return;

    const idx = line.indexOf('=');
    if (idx <= 0) return;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    // 去掉包裹的单/双引号
    if ((value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith('\'') && value.endsWith('\''))) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  });
  return result;
}


function resolveCosConfig(envFileArg) {
  const candidates = envFileArg ? [path.resolve(envFileArg)] : DEFAULT_ENV_FILES;
  const hitFile = candidates.find(item => fs.existsSync(item)) || '';
  const fileEnv = parseEnvFile(hitFile);

  const pick = key => process.env[key] || fileEnv[key] || '';
  const cos = {
    secretId: pick('TENCENT_COS_SECRET_ID'),
    secretKey: pick('TENCENT_COS_SECRET_KEY'),
    bucket: pick('TENCENT_COS_BUCKET'),
    region: pick('TENCENT_COS_REGION'),
  };

  const missing = Object.keys(cos).filter(key => !cos[key]);
  if (missing.length) {
    console.error('[migrate-cdn] COS 配置缺失:', missing.join(', '));
    console.error('[migrate-cdn] 已探测的 env 文件:', hitFile || '(无)');
    console.error('[migrate-cdn] 可用 --env-file <path> 显式指定，或直接注入环境变量');
    process.exit(1);
  }

  console.log(`[migrate-cdn] COS 配置来源: ${hitFile || 'process.env'}`);
  console.log(`[migrate-cdn] bucket=${cos.bucket} region=${cos.region}`);
  return cos;
}


function getContentType(key) {
  const ext = path.extname(key).toLowerCase();
  return CONTENT_TYPE_MAP[ext] || 'application/octet-stream';
}


/**
 * key -> 完整 URL
 *
 * 用 encodeURI 而不是 encodeURIComponent：后者会把路径分隔符 `/` 也编码掉。
 * 这里只需要把 @ 之类的字符转义成 %40，与源站 URL 形态保持一致。
 */
function toUrl(host, key) {
  return `${host}/${encodeURI(key)}`;
}


/**
 * HEAD 探测资源
 *
 * 必须显式声明 Accept-Encoding: identity。
 * Node fetch 默认带 `gzip, deflate, br`，CDN 对 js/css/svg 会返回压缩后的
 * content-length（adapter.js 实际 2220B，压缩后只报 803B），
 * 那样「源站大小 vs 目标大小」的幂等判断和一致性校验会全部误判。
 */
async function headUrl(url) {
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      headers: { 'Accept-Encoding': 'identity' },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    return {
      ok: res.ok,
      status: res.status,
      contentType: res.headers.get('content-type') || '',
      contentLength: Number(res.headers.get('content-length') || 0),
    };
  } catch (err) {
    return { ok: false, status: 0, contentType: '', contentLength: 0, error: err.message };
  }
}


async function downloadToFile(url, destPath) {
  const res = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (!res.ok) {
    throw new Error(`下载失败 HTTP ${res.status}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buffer);
  return buffer.length;
}


function getTargetKeys(only) {
  if (!only) return RESOURCE_KEYS;
  return RESOURCE_KEYS.filter(key => key.includes(only));
}


/** 阶段一：源站 -> 本地 -> 自有 COS */
async function phaseUpload(cos, args) {
  const keys = getTargetKeys(args.only);
  console.log(`\n=== [1/3] 上传 ${keys.length} 个资源到自有 COS ===`);

  const stat = { uploaded: 0, skipped: 0, failed: 0 };
  const failedKeys = [];

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const prefix = `[${i + 1}/${keys.length}] ${key}`;

    /* eslint-disable no-await-in-loop */
    const source = await headUrl(toUrl(SOURCE_HOST, key));
    if (!source.ok) {
      console.log(`${prefix} -> FAIL 源站不可用 (HTTP ${source.status})`);
      stat.failed += 1;
      failedKeys.push(key);
      continue;
    }

    // 幂等：目标已存在且大小一致就跳过，脚本可以反复跑 / 断点续传
    if (!args.force) {
      const target = await headUrl(toUrl(TARGET_HOST, key));
      if (target.ok && target.contentLength === source.contentLength) {
        console.log(`${prefix} -> SKIP 已存在 (${source.contentLength}B)`);
        stat.skipped += 1;
        continue;
      }
    }

    if (args.dryRun) {
      console.log(`${prefix} -> DRY-RUN 将上传 (${source.contentLength}B, ${getContentType(key)})`);
      continue;
    }

    const localPath = path.join(CACHE_DIR, key);
    try {
      // 本地缓存命中（大小一致）就不重复下载
      const cached = fs.existsSync(localPath) && fs.statSync(localPath).size === source.contentLength;
      if (!cached) {
        await downloadToFile(toUrl(SOURCE_HOST, key), localPath);
      }

      await uploadCOSFile({
        files: [{
          key,
          path: localPath,
          ContentType: getContentType(key),
        }],
        secretId: cos.secretId,
        secretKey: cos.secretKey,
        bucket: cos.bucket,
        region: cos.region,
      });

      console.log(`${prefix} -> OK (${source.contentLength}B, ${getContentType(key)})`);
      stat.uploaded += 1;
    } catch (err) {
      console.log(`${prefix} -> FAIL ${err.message}`);
      stat.failed += 1;
      failedKeys.push(key);
    }
    /* eslint-enable no-await-in-loop */
  }

  console.log(`\n[上传汇总] 成功 ${stat.uploaded} / 跳过 ${stat.skipped} / 失败 ${stat.failed}`);
  if (failedKeys.length) {
    console.log('[失败清单]');
    failedKeys.forEach(key => console.log(`  - ${key}`));
  }
  return stat.failed === 0;
}


/** 阶段二：校验自有 CDN 上的资源与源站一致 */
async function phaseVerify(args) {
  const keys = getTargetKeys(args.only);
  console.log(`\n=== [2/3] 校验自有 CDN 上 ${keys.length} 个资源 ===`);

  const stat = { ok: 0, failed: 0 };
  const problems = [];

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    /* eslint-disable-next-line no-await-in-loop */
    const [source, target] = await Promise.all([
      headUrl(toUrl(SOURCE_HOST, key)),
      headUrl(toUrl(TARGET_HOST, key)),
    ]);

    const sizeMatch = source.contentLength === target.contentLength;
    // content-type 只比主类型：COS 可能补上 charset 之类的后缀
    const typeMatch = (target.contentType || '').split(';')[0].trim()
      === (source.contentType || '').split(';')[0].trim();

    if (target.ok && sizeMatch && typeMatch) {
      stat.ok += 1;
      console.log(`[${i + 1}/${keys.length}] OK   ${key}`);
    } else {
      stat.failed += 1;
      const reason = !target.ok
        ? `HTTP ${target.status}`
        : `size ${source.contentLength}->${target.contentLength} / type ${source.contentType}->${target.contentType}`;
      problems.push(`${key} (${reason})`);
      console.log(`[${i + 1}/${keys.length}] FAIL ${key} ${reason}`);
    }
  }

  console.log(`\n[校验汇总] 通过 ${stat.ok} / 异常 ${stat.failed}`);
  if (problems.length) {
    console.log('[异常清单]');
    problems.forEach(item => console.log(`  - ${item}`));
  }
  return stat.failed === 0;
}


function walkTextFiles(dir, collected = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach((entry) => {
    if (entry.name.startsWith('.') && entry.name !== '.vuepress') return;

    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (WALK_IGNORE_DIRS.includes(entry.name)) return;
      walkTextFiles(full, collected);
      return;
    }
    if (TEXT_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      collected.push(full);
    }
  });
  return collected;
}


/** 阶段三：全量替换源码中的域名 */
function phaseReplace(args) {
  console.log('\n=== [3/3] 替换源码中的域名 ===');

  const files = walkTextFiles(ROOT);
  const excludeAbs = REPLACE_EXCLUDE.map(item => path.resolve(ROOT, item));
  // 前缀匹配（而非全等）：让 REPLACE_EXCLUDE 既能写具体文件也能写整个目录
  const isExcluded = file => excludeAbs.some(item => file === item || file.startsWith(`${item}${path.sep}`));

  const changed = [];
  const skipped = [];

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes(SOURCE_HOST)) return;

    const rel = path.relative(ROOT, file);
    if (isExcluded(file)) {
      skipped.push(rel);
      return;
    }

    const hits = content.split(SOURCE_HOST).length - 1;
    if (!args.dryRun) {
      fs.writeFileSync(file, content.split(SOURCE_HOST).join(TARGET_HOST));
    }
    changed.push({ rel, hits });
  });

  changed.forEach(({ rel, hits }) => {
    console.log(`${args.dryRun ? 'DRY-RUN' : 'DONE'} ${rel} (${hits} 处)`);
  });

  if (skipped.length) {
    console.log('\n[已跳过 - 见 config.js REPLACE_EXCLUDE 说明]');
    skipped.forEach(rel => console.log(`  - ${rel}`));
  }

  const total = changed.reduce((sum, item) => sum + item.hits, 0);
  console.log(`\n[替换汇总] ${changed.length} 个文件 / ${total} 处引用`);
  return true;
}


async function main() {
  const args = parseArgs(process.argv.slice(2));
  console.log('[migrate-cdn]', SOURCE_HOST, '->', TARGET_HOST);
  if (args.dryRun) console.log('[migrate-cdn] DRY-RUN 模式，不会写入任何内容');

  let allOk = true;

  if (args.upload) {
    const cos = resolveCosConfig(args.envFile);
    allOk = (await phaseUpload(cos, args)) && allOk;
  }
  if (args.verify) {
    allOk = (await phaseVerify(args)) && allOk;
  }
  if (args.replace) {
    // 替换前确保资源已经在目标 CDN 上，否则会把线上引用改成 404
    if (!args.upload && !args.verify && !args.dryRun) {
      console.log('\n[提示] 未同时执行 --upload/--verify，请确认资源已上传，否则替换后会 404');
    }
    allOk = phaseReplace(args) && allOk;
  }

  if (!allOk) {
    console.log('\n[migrate-cdn] 存在失败项，可用 --only <substr> 重试单个资源');
    process.exit(1);
  }
  console.log('\n[migrate-cdn] 全部完成');
}


main().catch((err) => {
  console.error('[migrate-cdn] 异常退出:', err);
  process.exit(1);
});
