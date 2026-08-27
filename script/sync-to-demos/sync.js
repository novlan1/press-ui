/**
 * @description 核心同步脚本：将 press-ui 的 demo 页面、组件、工具一次性推送到所有 demo 仓库
 *
 * 设计参考 tdesign-uniapp 的 example/script/watch/init.js（推模式）
 */
const fs = require('fs');
const path = require('path');

const {
  execCommand,
  readFileSync,
  writeFileSync,
  replaceContent,
} = require('t-comm');

const { config } = require('./config');

// ============================================================
// 工具函数
// ============================================================

function getTargetDir(demoConfig, dir, item) {
  if (!demoConfig.cpMap || demoConfig.cpMap[dir] === undefined) {
    return item
      ? path.resolve(demoConfig.dir, 'src', dir, item)
      : path.resolve(demoConfig.dir, 'src', dir);
  }
  const mapValue = demoConfig.cpMap[dir];

  // 对象形式：按 item glob 匹配不同目标
  // 注：cpMap 值是父目录，item 名会作为子目录自动拼接
  if (typeof mapValue === 'object' && mapValue !== null) {
    if (!item) return path.resolve(demoConfig.dir, dir);
    const glob = require('glob');
    const minimatch = glob.minimatch || ((s, p) => {
      const re = new RegExp(`^${p.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`);
      return re.test(s);
    });
    for (const [pattern, parentDir] of Object.entries(mapValue)) {
      if (minimatch(item, pattern)) {
        if (parentDir === '.') return path.resolve(demoConfig.dir, item);
        // 返回"父目录/item"，作为最终目标
        return path.resolve(demoConfig.dir, parentDir, item);
      }
    }
    return path.resolve(demoConfig.dir, dir, item);
  }

  // 字符串形式
  if (mapValue === '.') {
    return item ? path.resolve(demoConfig.dir, item) : path.resolve(demoConfig.dir, dir);
  }
  return item
    ? path.resolve(demoConfig.dir, mapValue, item)
    : path.resolve(demoConfig.dir, mapValue);
}

function displayRelative(demoConfig, targetDir) {
  return path.relative(demoConfig.dir, targetDir);
}

function isUniModulesMapping(mapValue) {
  if (typeof mapValue === 'string') return mapValue.startsWith('uni_modules');
  if (typeof mapValue === 'object' && mapValue !== null) {
    return Object.values(mapValue).some(v => typeof v === 'string' && v.startsWith('uni_modules'));
  }
  return false;
}

function listItemsForCopy(demoConfig, dir) {
  const filter = demoConfig.cpFilter && demoConfig.cpFilter[dir];
  if (!filter || !filter.include) return null;
  const source = path.resolve(config.pressUiSrc, dir);
  if (!fs.existsSync(source)) return [];
  const glob = require('glob');
  return filter.include.flatMap(p => glob.sync(p, { cwd: source, nodir: false }));
}

function hasRootOwnedFiles(targetDir) {
  try {
    const result = require('child_process').execSync(
      `find ${targetDir} -user root -mindepth 1 -maxdepth 1 2>/dev/null | head -1 | wc -l`,
      { encoding: 'utf8', timeout: 5000 },
    )
      .trim();
    return parseInt(result, 10) > 0;
  } catch (e) {
    return false;
  }
}

/**
 * 在指定目录和根文件中做字符串替换（纯 Node）
 */
function replaceInFiles(rootDir, replaceMap, scanDirs, rootFiles, extensions) {
  const glob = require('glob');
  const files = [];
  for (const d of scanDirs) {
    const dp = path.resolve(rootDir, d);
    if (!fs.existsSync(dp)) continue;
    glob.sync(path.join(dp, '**/*'), { nodir: true }).forEach((f) => {
      if (extensions.includes(path.extname(f))) files.push(f);
    });
  }
  for (const f of rootFiles) {
    const fp = path.resolve(rootDir, f);
    if (fs.existsSync(fp)) files.push(fp);
  }
  let count = 0;
  for (const fp of files) {
    let content = fs.readFileSync(fp, 'utf-8');
    let changed = false;
    for (const [from, to] of Object.entries(replaceMap)) {
      if (content.includes(from)) {
        content = content.split(from).join(to); changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(fp, content, 'utf-8'); count += 1;
    }
  }
  return count;
}

// ============================================================
// 同步步骤
// ============================================================

function clearTargetDirs(demoConfig) {
  for (const dir of demoConfig.cpList) {
    const mapValue = demoConfig.cpMap && demoConfig.cpMap[dir];
    const isItemMapped = mapValue && typeof mapValue === 'object';
    if (!isItemMapped) {
      const td = getTargetDir(demoConfig, dir);
      if (fs.existsSync(td)) doClear(demoConfig, td);
    } else {
      // per-item 模式：先清空每个 item 自己的目标
      const items = listItemsForCopy(demoConfig, dir);
      for (const item of items) {
        const td = getTargetDir(demoConfig, dir, item);
        if (fs.existsSync(td)) doClear(demoConfig, td);
      }
      // 再清空 cpMap 中各 target 的顶层残留（其他不在新 cpMap 里的旧 item）
      const clearedTargets = new Set();
      for (const [_pattern, target] of Object.entries(mapValue)) {
        if (target === '.') continue;
        const targetDir = path.resolve(demoConfig.dir, target);
        if (clearedTargets.has(targetDir)) continue;
        clearedTargets.add(targetDir);
        if (fs.existsSync(targetDir)) doClear(demoConfig, targetDir);
      }
    }
  }
}

function doClear(demoConfig, targetDir) {
  console.log(`  [clear] ${targetDir}`);
  if (hasRootOwnedFiles(targetDir)) {
    console.warn('  [warn] 目录含 root 属主文件，跳过清理');
    console.warn(`         修复命令: sudo chown -R $(whoami) ${targetDir} && rm -rf ${targetDir}`);
    demoConfig._hasRootFiles = true;
    return;
  }
  try {
    execCommand(`rm -rf ${targetDir}`, demoConfig.dir);
  } catch (e) {
    console.warn(`  [warn] rm -rf 失败: ${e.message}`); demoConfig._hasRootFiles = true;
  }
}

function copySourceFiles(demoConfig) {
  for (const dir of demoConfig.cpList) {
    const source = path.resolve(config.pressUiSrc, dir);
    const mapValue = demoConfig.cpMap && demoConfig.cpMap[dir];
    const isItemMapped = mapValue && typeof mapValue === 'object';
    const filter = demoConfig.cpFilter && demoConfig.cpFilter[dir];
    if (!fs.existsSync(source)) continue;

    if (!isItemMapped) {
      doCopy(demoConfig, dir, source, getTargetDir(demoConfig, dir), filter, null);
    } else {
      const items = listItemsForCopy(demoConfig, dir);
      for (const item of items) {
        doCopy(demoConfig, dir, source, getTargetDir(demoConfig, dir, item), filter, item);
      }
    }
  }
}

/**
 * 把 exclude 模式转成 rsync 能识别的形式
 *
 * rsync 的 --exclude=PATTERN：不含 `/` 时匹配任意层级的文件/目录名，
 * 但为了语义明确、避免歧义，统一加上 `**\/` 前缀显式声明"任意层级"。
 * 否则像 tests、demo.vue 这类只写名字的模式在多层目录下容易漏匹配。
 */
function toRsyncExcludes(excludeList) {
  return (excludeList || [])
    .map((p) => {
      const pattern = p.replace(/\/$/, '');
      return `--exclude="${pattern}" --exclude="**/${pattern}"`;
    })
    .join(' ');
}

/**
 * 判断某个 item 名是否命中 exclude 列表
 *
 * glob 展开出来的顶层"文件"是直接 cp 的，不经过 rsync，
 * 所以 exclude 对它们不生效——必须在这里先拦一道。
 * 否则 packages/package.json、LICENSE 之类的发包元文件会被带进 demo。
 */
function isExcludedItem(name, excludeList) {
  if (!excludeList || !excludeList.length) return false;
  const base = path.basename(name);
  return excludeList.some((pattern) => {
    const p = pattern.replace(/\/$/, '');
    if (!p.includes('*')) return base === p;
    const re = new RegExp(`^${p.split('*').map(s => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&'))
      .join('.*')}$`);
    return re.test(base);
  });
}

function doCopy(demoConfig, dir, source, targetDir, filter, item) {
  if (demoConfig._hasRootFiles && fs.existsSync(targetDir) && hasRootOwnedFiles(targetDir)) {
    console.warn(`  [warn] 跳过 ${displayRelative(demoConfig, targetDir)}（root 属主文件）`); return;
  }

  // 判断目标是文件还是目录：item 存在时检查源是文件还是目录
  let targetIsFile = false;
  if (item) {
    const src = path.resolve(source, item);
    if (fs.existsSync(src)) targetIsFile = fs.statSync(src).isFile();
  }

  const rel = displayRelative(demoConfig, targetDir);
  console.log(`  [copy] ${rel}${targetIsFile ? '' : '/'}`);

  // 目录目标才 mkdir；文件目标只确保父目录存在
  if (targetIsFile) {
    fs.mkdirSync(path.dirname(targetDir), { recursive: true });
  } else {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  try {
    if (item) {
      const src = path.resolve(source, item);
      if (!fs.existsSync(src)) return;
      const stat = fs.statSync(src);
      if (stat.isDirectory() && filter && filter.exclude && filter.exclude.length > 0) {
        const ex = toRsyncExcludes(filter.exclude);
        execCommand(`rsync -a ${ex} ${src}/ ${targetDir}/`, config.pressUiRoot);
      } else if (stat.isDirectory()) {
        execCommand(`cp -R ${src} ${path.dirname(targetDir)}`, config.pressUiRoot);
      } else {
        // 文件：cp file targetFile（targetDir 已是文件路径）
        execCommand(`cp ${src} ${targetDir}`, config.pressUiRoot);
      }
    } else if (filter && filter.include) {
      const glob = require('glob');
      const ex = toRsyncExcludes(filter.exclude);
      for (const p of filter.include) {
        for (const m of glob.sync(p, { cwd: source, nodir: false })) {
          // 顶层 item 自身命中 exclude 时直接跳过（rsync 的 --exclude 管不到这一层）
          // rootExclude（package.json / index.js 等顶层元文件）只在这里做顶层匹配，
          // 不能进 toRsyncExcludes 的递归排除——否则组件目录内的 index.js 会被一并删掉。
          if (isExcludedItem(m, [...(filter.exclude || []), ...(filter.rootExclude || [])])) continue;
          const src = path.resolve(source, m);
          const dst = path.resolve(targetDir, m);
          const stat = fs.statSync(src);
          fs.mkdirSync(path.dirname(dst), { recursive: true });
          if (stat.isDirectory() && filter.exclude && filter.exclude.length > 0) {
            execCommand(`rsync -a ${ex} ${src}/ ${dst}/`, config.pressUiRoot);
          } else if (stat.isDirectory()) {
            execCommand(`cp -R ${src} ${path.dirname(dst)}`, config.pressUiRoot);
          } else {
            execCommand(`cp ${src} ${dst}`, config.pressUiRoot);
          }
        }
      }
    } else {
      execCommand(`cp -R ${source}/. ${targetDir}/`, config.pressUiRoot);
    }
  } catch (e) {
    // 复制失败必须显性暴露：静默吞掉会导致 filter 没生效、
    // 多余文件被带进 demo，最后要到打包才发现。
    console.warn(`  [warn] 复制失败: ${e.message}`);
    console.warn(`         dir=${dir} item=${item || '-'} target=${displayRelative(demoConfig, targetDir)}`);
    demoConfig._hasRootFiles = true;
  }
}

// 应用入口文件：sync 不强制覆盖 demo 端已存在的版本。
//
// 这些文件经常需要按 demo 自身需求调整（例如 vue2-uni 改成走 npm 包
// `press-ui/xxx` 形式而不是相对路径 `./packages/xxx`），sync 覆盖会把
// demo 的自定义改回主源版本。改用"已存在则跳过"策略：
//   - 首次 sync（demo 没这文件）→ 从主源复制
//   - 后续 sync（demo 已有）   → 跳过，让 demo 自行维护
//
// 想强制覆盖 demo 的入口文件时，直接 rm 该文件再 sync 即可。
const ENTRY_FILES = new Set(['main.js']);

function copySingleFiles(demoConfig) {
  if (!demoConfig.files || !demoConfig.files.length) return;
  for (const file of demoConfig.files) {
    const source = path.resolve(config.pressUiSrc, file);
    const target = getTargetDir(demoConfig, file);
    if (!fs.existsSync(source)) continue;
    if (ENTRY_FILES.has(file) && fs.existsSync(target)) {
      console.log(`  [skip] ${displayRelative(demoConfig, target)} (应用入口已存在，保留 demo 版本)`);
      continue;
    }
    console.log(`  [copy] ${displayRelative(demoConfig, target)}`);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    try {
      fs.copyFileSync(source, target);
    } catch (e) {}
  }
}

function replaceImportsForHx(demoConfig) {
  const { replaceAlias } = require('t-comm/lib/replace-alias');

  // 1. 所有 `press-ui/*` → `uni_modules/press-ui/components/*`
  //
  // scanDirs 必须包含 uni_modules/press-ui/components：
  // 组件包内部也有裸包名导入（如 press-cascader/helper.js 引
  // 'press-ui/press-area/computed'、press-area/computed.js 引
  // 'press-ui/common/utils/fetch-data'）。
  // 漏扫这个目录会导致 HBuilderX 打包时
  //   "Rollup failed to resolve import press-ui/press-area/computed"
  // ——因为组件包内的引用不会走 node_modules 解析。
  console.log('  [alias] press-ui → uni_modules/press-ui/components');
  replaceAlias({
    rootDir: demoConfig.dir,
    aliasMap: { 'press-ui': 'uni_modules/press-ui/components' },
    scanDirs: ['pages', 'utils', 'windows', 'uni_modules/press-ui/components'],
    scanRootFiles: ['App.vue', 'main.js'],
    supportedExtensions: ['.vue', '.js', '.ts'],
  });

  // 2. 修正 ./src/utils/ → ./utils/（App.vue / main.js 中）
  replaceInFiles(demoConfig.dir, {
    './src/utils/': './utils/',
  }, [], ['App.vue', 'main.js'], ['.vue', '.js']);
  // 补上之前可能被误删的 components/（locale/mixins/common 都在 components 下）
  replaceInFiles(demoConfig.dir, {
    '/uni_modules/press-ui/locale/': '/uni_modules/press-ui/components/locale/',
    '/uni_modules/press-ui/mixins/': '/uni_modules/press-ui/components/mixins/',
    '/uni_modules/press-ui/common/': '/uni_modules/press-ui/components/common/',
  }, [], ['App.vue', 'main.js'], ['.vue', '.js']);
  // 3. App.vue 的全局样式改成 @import 内联，不用 <style src> 外链。
  //
  // 主源写的是 <style lang="scss" src="src/utils/style/demo.scss">，
  // vue3-pure / vue2-uni 有真实 src/ 目录所以能直接用；
  // vue3-hx 是扁平结构（utils/ 在根），路径要改写。
  //
  // 但仅把 src 改成 './utils/...' 在 App 端仍会失败：
  // uni-app App 端会把 App.vue 的 style 抽成独立的 app.css.js，
  // 外链的相对基准随之改变，报
  //   "Could not load ./utils/style/demo.scss ... (imported by ./app.css.js)"
  // 改成 @import 写在 <style> 内部，路径由 scss 编译期解析，App/H5/小程序都稳。
  const appVuePath = path.resolve(demoConfig.dir, 'App.vue');
  if (fs.existsSync(appVuePath)) {
    let appVue = fs.readFileSync(appVuePath, 'utf-8');
    const styleSrcRe = /<style([^>]*?)\ssrc=["'](?:\.\/)?(?:src\/)?utils\/style\/([^"']+)["']([^>]*)>\s*<\/style>/g;
    styleSrcRe.lastIndex = 0;
    if (styleSrcRe.test(appVue)) {
      styleSrcRe.lastIndex = 0;
      appVue = appVue.replace(
        styleSrcRe,
        (_m, pre, file, post) => `<style${pre}${post}>\n@import './utils/style/${file}';\n</style>`,
      );
      fs.writeFileSync(appVuePath, appVue);
      console.log('  [fix] App.vue style src → @import（App 端兼容）');
    }
  }

  // 4. locale/ 兜底：补 en.json / zh.json
  //
  // locale/ 是 uni-app 的约定目录——只要存在，框架就启用内建 i18n，
  // 并按系统语言查找对应文件。目录里只有 en-US.json / zh-CN.json 时，
  // 系统语言为 en / zh 就会报
  //   "当前应用配置的 fallbackLocale 或 locale 为: en, 但 locale 目录缺少该语言文件"
  // 这里按 xx-YY.json 生成同内容的短代码 xx.json 兜底。
  const localeDir = path.resolve(demoConfig.dir, 'locale');
  if (fs.existsSync(localeDir)) {
    for (const f of fs.readdirSync(localeDir)) {
      const m = f.match(/^([a-z]{2})-[A-Za-z]+\.json$/);
      if (!m) continue;
      const shortFile = path.resolve(localeDir, `${m[1]}.json`);
      if (fs.existsSync(shortFile)) continue;
      fs.copyFileSync(path.resolve(localeDir, f), shortFile);
      console.log(`  [fix] locale/${m[1]}.json（由 ${f} 兜底生成）`);
    }
  }
}

/**
 * 历史遗留：submodule 时代 demo 仓库把 press-ui 挂在 src/press-ui/，
 * 需要把 src/packages/ 改写成 src/press-ui/src/packages/。
 * submodule 已全部移除，各 demo 改走 npm 包，所以现在所有 demo 的 pathFix 都是 false。
 * 保留函数以兼容旧配置，不建议再打开。
 */
function applyPathFix(demoConfig) {
  if (!demoConfig.pathFix) return;
  const pagesDir = getTargetDir(demoConfig, 'pages');
  if (!fs.existsSync(pagesDir)) return;
  replaceContent({
    replaceList: [{ list: [['src/packages/', 'src/press-ui/src/packages/']], dirList: [pagesDir] }],
    targetProject: demoConfig.dir,
  });
  console.log('  [fix] import 路径已修正');
}

function generatePagesJson(demoConfig) {
  if (!demoConfig.pagesJson) return;
  const pressUiPagesJson = path.resolve(config.pressUiSrc, 'pages.json');
  let targetPagesJson;
  if (demoConfig.pagesJsonPath) {
    targetPagesJson = path.resolve(demoConfig.dir, demoConfig.pagesJsonPath, 'pages.json');
  } else {
    targetPagesJson = [
      path.resolve(demoConfig.dir, 'src/pages.json'),
      path.resolve(demoConfig.dir, 'pages.json'),
    ].find(p => fs.existsSync(p));
  }
  if (!targetPagesJson) {
    console.log('  [skip] demo 无 pages.json'); return;
  }
  if (!fs.existsSync(pressUiPagesJson)) {
    console.log('  [skip] press-ui 无 pages.json'); return;
  }
  console.log(`  [pages.json] ${targetPagesJson}`);

  const content = readFileSync(pressUiPagesJson);
  const match = content.match(/subPackages": (\[[\s\S]+\]),\s+"preloadRule/);
  let subPackages = [];
  try {
    subPackages = JSON.parse(match?.[1] || '[]');
  } catch (e) {}
  let target; try {
    target = JSON.parse(readFileSync(targetPagesJson));
  } catch (e) {
    return;
  }
  target.subPackages = subPackages;
  writeFileSync(targetPagesJson, target, true);
  console.log('  [pages.json] subPackages 已更新');
}

function copyAppVue(demoConfig) {
  if (!demoConfig.appVue) return;
  const source = path.resolve(config.pressUiSrc, 'App.vue');
  const target = path.resolve(demoConfig.dir, 'src/App.vue');
  if (!fs.existsSync(source)) return;
  fs.copyFileSync(source, target);
  console.log('  [copy] App.vue');
}

function runPostInit(demoConfig) {
  if (!demoConfig.postInit) return;
  for (const cmd of demoConfig.postInit) {
    console.log(`  [post] ${cmd}`);
    try {
      execCommand(cmd, demoConfig.dir, 'inherit');
    } catch (e) {}
  }
}

function syncVersion(demoConfig) {
  const p0 = path.resolve(config.pressUiRoot, 'package.json');
  const p1 = path.resolve(demoConfig.dir, 'package.json');
  if (!fs.existsSync(p1)) return;
  let a; let b;
  try {
    a = JSON.parse(readFileSync(p0));
  } catch (e) {
    return;
  }
  try {
    b = JSON.parse(readFileSync(p1));
  } catch (e) {
    return;
  }

  let changed = false;

  if (b.version !== a.version) {
    b.version = a.version; changed = true; console.log(`  [version] ${b.version}`);
  }

  // 组件走 npm 包的 demo：press-ui 依赖版本必须跟主源对齐。
  // 否则主源新增的组件 / demo-helper 在 demo 里解析不到（装的还是旧包）。
  if (demoConfig.alignPressUiDep && b.dependencies && b.dependencies['press-ui']) {
    if (b.dependencies['press-ui'] !== a.version) {
      console.log(`  [dep] press-ui ${b.dependencies['press-ui']} → ${a.version}`);
      b.dependencies['press-ui'] = a.version;
      changed = true;
      demoConfig._needInstall = true;
    }
  }

  if (changed) writeFileSync(p1, b, true);
}

// ============================================================
// 主流程
// ============================================================

function syncOneDemo(demoName, demoConfig) {
  console.log(`\n[${demoName}]`);
  if (!fs.existsSync(demoConfig.dir)) {
    console.log('  [skip] 不存在'); return 'skipped';
  }

  let w = false;

  clearTargetDirs(demoConfig); if (demoConfig._hasRootFiles) w = true;
  copySourceFiles(demoConfig); copySingleFiles(demoConfig); if (demoConfig._hasRootFiles) w = true;

  if (demoConfig.cpList.includes('packages') && demoConfig.cpMap && isUniModulesMapping(demoConfig.cpMap.packages)) {
    replaceImportsForHx(demoConfig);
  }

  applyPathFix(demoConfig);
  generatePagesJson(demoConfig);
  copyAppVue(demoConfig);
  runPostInit(demoConfig);
  syncVersion(demoConfig);

  const result = w || demoConfig._hasRootFiles ? 'warning' : 'ok';
  const needInstall = !!demoConfig._needInstall;
  delete demoConfig._hasRootFiles;
  delete demoConfig._needInstall;
  console.log(`[${demoName}] ${result === 'ok' ? 'done' : 'done (有警告)'}`);
  if (needInstall) {
    console.log(`[${demoName}] press-ui 依赖版本已更新，需要重新安装依赖`);
  }
  return { result, needInstall };
}

function main() {
  const arg = process.argv[2];
  const targets = arg ? arg.split(',').map(s => s.trim())
    .filter(Boolean) : Object.keys(config.demos);
  console.log('[sync-to-demos] 开始同步...');
  console.log(`[sync-to-demos] targets: ${targets.join(', ')}`);

  console.log('[press-ui] npm run init (dispatch + gen:config)...');
  execCommand('npm run init', config.pressUiRoot, 'inherit');
  console.log('[press-ui] init 完成\n');

  const ok = []; const warn = []; const skip = []; const needInstall = [];
  for (const name of targets) {
    const dc = config.demos[name];
    if (!dc) {
      skip.push(name); continue;
    }
    const r = syncOneDemo(name, dc);
    if (r === 'skipped') {
      skip.push(name); continue;
    }
    if (r.needInstall) needInstall.push(name);
    if (r.result === 'warning') warn.push(name);
    else ok.push(name);
  }

  console.log('\n========================================');
  console.log('[sync-to-demos] 同步完成');
  if (ok.length) console.log(`  成功: ${ok.join(', ')}`);
  if (warn.length) console.log(`  警告: ${warn.join(', ')}`);
  if (skip.length) console.log(`  跳过: ${skip.join(', ')}`);
  if (needInstall.length) {
    console.log(`  待安装依赖: ${needInstall.join(', ')}`);
    console.log('    → 请在对应目录执行 pnpm install');
  }
  console.log('========================================');

  // 同步后立刻做一次 import 解析校验：
  // 主源有 webpack alias（press-ui / src）能跑通的 import，
  // 到 demo 环境未必解析得到，不校验就要等打包才发现。
  const verified = targets.filter(n => config.demos[n] && !skip.includes(n));
  if (verified.length) {
    console.log('');
    try {
      execCommand(
        `node ${path.resolve(__dirname, 'verify.js')} ${verified.join(',')}`,
        config.pressUiRoot,
        'inherit',
      );
    } catch (e) {
      console.warn('[sync-to-demos] 校验发现断链引入，请按上面提示修复');
      process.exitCode = 1;
    }
  }
}

main();
