/**
 * @description 校验各 demo 仓库同步后的 import 是否都能被解析
 *
 * 为什么需要：
 *   press-ui 主源用 webpack alias（press-ui → src/packages、src → src）能跑通，
 *   但同步到 demo 后各仓库的 alias / 目录结构不同，
 *   同一句 import 在 demo 里可能 resolve 不到，直到打包才暴露。
 *   这个脚本在同步后静态扫描一遍，提前把断链找出来。
 *
 * 用法：
 *   node script/sync-to-demos/verify.js              # 校验全部
 *   node script/sync-to-demos/verify.js vue3-hx      # 只校验指定 demo
 */
const fs = require('fs');
const path = require('path');

const { config } = require('./config');

// 可省略的扩展名（按 resolve 顺序）
const EXTENSIONS = ['', '.vue', '.ts', '.js', '.json', '.mjs', '.scss', '.css'];
// 目录形式引入时尝试的入口文件
const INDEX_FILES = ['index.ts', 'index.js', 'index.vue', 'index.json'];

const SCAN_EXTENSIONS = ['.vue', '.ts', '.js'];

/**
 * 已知的"非同步问题"断链，报告里降级为 warning，不阻塞流程
 *
 * 这些不是同步脚本导致的，而是组件本身的可选依赖：
 *   swiper-next/*       - 仅普通 Vue 项目按需安装，uni-app 端走内置 swiper
 *   vue-cropper/*.css   - vue-cropper 0.6.x 不再单独产出 css
 *
 * 注意：不要把 ../image/index.vue 之类的"包内相对引用"加进来。
 * 它是 press-image.vue 的真实运行时依赖，解析不到说明 src/packages/image/
 * 没被同步过去（同步漏项），必须当 error 暴露，不能降级。
 */
const KNOWN_OPTIONAL = [
  /^swiper-next\//,
  /^vue-cropper\//,
];

// 组件库的 npm 包名。组件包目录内部出现 `${BARE_PKG}/xxx` 形式的导入即为同步漏改。
const BARE_PKG = 'press-ui';

function isKnownOptional(spec) {
  return KNOWN_OPTIONAL.some(re => re.test(spec));
}

/**
 * 每个 demo 的模块解析规则
 *   scanDirs  - 需要扫描的目录（相对 demo 根）
 *   rootFiles - 需要扫描的根文件
 *   alias     - 裸模块前缀 → 本地目录（相对 demo 根）
 *
 * 注意：只扫"进 git 的源码目录"。
 *   像 vue2-pure 的 src/packages/ 在 .gitignore 里（同步生成的本地产物），
 *   里面的 tests/demo.spec.ts 引 ../../../../tests/unit/demo 属于主源单测用的路径，
 *   在 demo 里既不会被 jest 扫到（jest 只匹配 <rootDir>/tests/unit/），也不参与打包，
 *   扫它只会产生大量噪音。
 */
const VERIFY_RULES = {
  'vue3-hx': {
    scanDirs: ['pages', 'utils', 'windows', 'uni_modules/press-ui/components'],
    rootFiles: ['App.vue', 'main.js'],
    // press-ui 必须映射到本地 components 目录，不能留空。
    // 留空时 'press-ui/press-area/computed' 会被当成裸模块去 node_modules 查，
    // 而 demo 的 node_modules 里恰好装了 press-ui 包 → 校验"通过"，
    // 但 HBuilderX 打包时组件包内的引用不走 node_modules，直接 Rollup 报错。
    // 映射到本地目录才能复现真实的打包解析行为。
    alias: { 'press-ui': 'uni_modules/press-ui/components' },
    // 该目录下的文件不允许出现裸包名导入（必须是相对路径）
    bareInPkgPrefix: 'uni_modules/press-ui/components',
  },
  'vue3-pure': {
    scanDirs: ['src/pages', 'src/utils', 'src/views'],
    rootFiles: ['src/App.vue', 'src/main.ts'],
    alias: { src: 'src', '@': 'src' },
  },
  'vue2-pure': {
    // src/packages/ 在 .gitignore 里（本地产物），不扫
    scanDirs: ['src/pages', 'src/utils'],
    rootFiles: [],
    alias: { src: 'src', '@': 'src' },
  },
  'vue2-uni': {
    // src/packages/ 同上
    scanDirs: ['src/pages', 'src/utils', 'src/windows'],
    rootFiles: ['src/App.vue', 'src/main.js'],
    alias: { src: 'src' },
  },
};

function collectFiles(rootDir, scanDirs, rootFiles) {
  const files = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      if (name === 'node_modules' || name.startsWith('.')) continue;
      const full = path.join(dir, name);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) walk(full);
      else if (SCAN_EXTENSIONS.includes(path.extname(full))) files.push(full);
    }
  };
  for (const d of scanDirs) walk(path.resolve(rootDir, d));
  for (const f of rootFiles) {
    const fp = path.resolve(rootDir, f);
    if (fs.existsSync(fp)) files.push(fp);
  }
  return files;
}

const IMPORT_RE = /(?:^|\n)\s*(?:import|export)[\s\S]*?from\s+['"]([^'"]+)['"]/g;
const SIDE_EFFECT_RE = /(?:^|\n)\s*import\s+['"]([^'"]+)['"]/g;

function extractImports(content) {
  const list = [];
  for (const re of [IMPORT_RE, SIDE_EFFECT_RE]) {
    re.lastIndex = 0;
    let m;
    // eslint-disable-next-line no-cond-assign
    while ((m = re.exec(content)) !== null) list.push(m[1]);
  }
  return [...new Set(list)];
}

function tryResolve(absBase) {
  for (const ext of EXTENSIONS) {
    const p = absBase + ext;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return true;
  }
  if (fs.existsSync(absBase) && fs.statSync(absBase).isDirectory()) {
    for (const idx of INDEX_FILES) {
      if (fs.existsSync(path.join(absBase, idx))) return true;
    }
  }
  return false;
}

/** 裸模块：走 node_modules，若能定位到包目录则继续校验内部路径 */
function resolveBareModule(rootDir, spec) {
  const segs = spec.split('/');
  const pkgName = spec.startsWith('@') ? segs.slice(0, 2).join('/') : segs[0];
  const subPath = spec.slice(pkgName.length + 1);

  const pkgDir = path.resolve(rootDir, 'node_modules', pkgName);
  if (!fs.existsSync(pkgDir)) {
    // node_modules 未安装时不当作错误（可能只是没 install）
    return { ok: true, reason: 'node_modules 未安装，跳过' };
  }
  if (!subPath) return { ok: true };
  return { ok: tryResolve(path.resolve(pkgDir, subPath)), pkgName, subPath };
}

function verifyOne(demoName) {
  const demoConfig = config.demos[demoName];
  const rule = VERIFY_RULES[demoName];
  if (!demoConfig || !rule) return { demoName, status: 'skipped', reason: '无配置' };
  if (!fs.existsSync(demoConfig.dir)) return { demoName, status: 'skipped', reason: '目录不存在' };

  const rootDir = demoConfig.dir;
  const bareInPkgPrefix = rule.bareInPkgPrefix || '';
  const files = collectFiles(rootDir, rule.scanDirs, rule.rootFiles);
  const errors = [];
  const warnings = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    for (const spec of extractImports(content)) {
      // 跳过纯样式/协议/条件编译占位
      if (spec.startsWith('http') || spec.startsWith('data:') || spec.startsWith('~')) continue;

      let ok = true;
      let hint = '';

      if (spec.startsWith('.')) {
        ok = tryResolve(path.resolve(path.dirname(file), spec));
      } else {
        const aliasKey = Object.keys(rule.alias)
          .filter(k => spec === k || spec.startsWith(`${k}/`))
          .sort((a, b) => b.length - a.length)[0];

        if (aliasKey) {
          const rest = spec.slice(aliasKey.length).replace(/^\//, '');
          ok = tryResolve(path.resolve(rootDir, rule.alias[aliasKey], rest));
          hint = `alias ${aliasKey} → ${rule.alias[aliasKey]}`;
        } else {
          const r = resolveBareModule(rootDir, spec);
          ok = r.ok;
          if (r.reason) hint = r.reason;
        }
      }

      if (!ok) {
        const bucket = isKnownOptional(spec) ? warnings : errors;
        bucket.push({ file: path.relative(rootDir, file), spec, hint });
      }

      // 额外规则：组件包内部禁止出现裸包名 'press-ui/xxx'。
      //
      // 这类写法用 alias 能"解析成功"（指向的文件确实存在），所以上面的
      // !ok 判断抓不到，但 HBuilderX/Rollup 打包组件包时不做 alias 替换，
      // 会直接 "Failed to resolve import press-ui/press-area/computed"。
      // 同步脚本本该把它们重写成相对路径，漏改就必须在这里拦住。
      if (bareInPkgPrefix && spec.startsWith(`${BARE_PKG}/`)) {
        const rel = path.relative(rootDir, file);
        if (rel.startsWith(bareInPkgPrefix)) {
          errors.push({
            file: rel,
            spec,
            hint: '组件包内不可用裸包名，应为相对路径（同步脚本 replaceAlias 漏改）',
          });
        }
      }
    }
  }

  let status = 'ok';
  if (errors.length) status = 'fail';
  else if (warnings.length) status = 'warn';

  return {
    demoName, status, errors, warnings, fileCount: files.length,
  };
}

function printGrouped(list, mark, rootLabel) {
  const grouped = {};
  for (const e of list) {
    grouped[e.spec] = grouped[e.spec] || [];
    grouped[e.spec].push(e.file);
  }
  if (rootLabel) console.log(`  ${rootLabel}`);
  for (const [spec, fileList] of Object.entries(grouped)) {
    console.log(`  ${mark} ${spec}`);
    for (const f of fileList.slice(0, 3)) console.log(`      ${f}`);
    if (fileList.length > 3) console.log(`      ...共 ${fileList.length} 处`);
  }
}

function main() {
  const arg = process.argv[2];
  const targets = arg
    ? arg.split(',').map(s => s.trim())
      .filter(Boolean)
    : Object.keys(config.demos);

  console.log('[verify] 校验 demo 仓库 import 解析...\n');

  const results = targets.map(verifyOne);
  let failed = 0;

  for (const r of results) {
    if (r.status === 'skipped') {
      console.log(`[${r.demoName}] skip - ${r.reason}`);
      continue;
    }
    if (r.status === 'ok') {
      console.log(`[${r.demoName}] ok (${r.fileCount} 个文件)`);
      continue;
    }
    if (r.status === 'warn') {
      console.log(`[${r.demoName}] ok，但有 ${r.warnings.length} 处可选依赖未安装 (共 ${r.fileCount} 个文件)`);
      printGrouped(r.warnings, '!');
      console.log('');
      continue;
    }

    failed += 1;
    console.log(`[${r.demoName}] FAIL - ${r.errors.length} 处无法解析 (共 ${r.fileCount} 个文件)`);
    printGrouped(r.errors, '✗');
    if (r.warnings.length) printGrouped(r.warnings, '!', `另有 ${r.warnings.length} 处可选依赖未安装：`);
    console.log('');
  }

  console.log('========================================');
  if (failed) {
    console.log(`[verify] ${failed} 个 demo 存在断链引入`);
    process.exitCode = 1;
  } else {
    console.log('[verify] 全部通过');
  }
  console.log('========================================');
}

main();
