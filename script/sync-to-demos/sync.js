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
        const ex = filter.exclude.map(p => `--exclude="${p}"`).join(' ');
        execCommand(`rsync -a ${ex} ${src}/ ${targetDir}/`, config.pressUiRoot);
      } else if (stat.isDirectory()) {
        execCommand(`cp -R ${src} ${path.dirname(targetDir)}`, config.pressUiRoot);
      } else {
        // 文件：cp file targetFile（targetDir 已是文件路径）
        execCommand(`cp ${src} ${targetDir}`, config.pressUiRoot);
      }
    } else if (filter && filter.include) {
      const glob = require('glob');
      const ex = (filter.exclude || []).map(p => `--exclude="${p}"`).join(' ');
      for (const p of filter.include) {
        for (const m of glob.sync(p, { cwd: source, nodir: false })) {
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
    console.warn(`  [warn] 复制失败: ${e.message}`);
  }
}

function copySingleFiles(demoConfig) {
  if (!demoConfig.files || !demoConfig.files.length) return;
  for (const file of demoConfig.files) {
    const source = path.resolve(config.pressUiSrc, file);
    const target = getTargetDir(demoConfig, file);
    if (!fs.existsSync(source)) continue;
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
  console.log('  [alias] press-ui → uni_modules/press-ui/components');
  replaceAlias({
    rootDir: demoConfig.dir,
    aliasMap: { 'press-ui': 'uni_modules/press-ui/components' },
    scanDirs: ['pages', 'utils', 'windows'],
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
  // style src 路径修正：补上 ./ 前缀（Vite 要求）
  replaceInFiles(demoConfig.dir, {
    'src="utils/': 'src="./utils/',
  }, [], ['App.vue'], ['.vue']);
}

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
  if (b.version !== a.version) {
    b.version = a.version; writeFileSync(p1, b, true); console.log(`  [version] ${b.version}`);
  }
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
  delete demoConfig._hasRootFiles;
  console.log(`[${demoName}] ${result === 'ok' ? 'done' : 'done (有警告)'}`);
  return result;
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

  const ok = []; const warn = []; const skip = [];
  for (const name of targets) {
    const dc = config.demos[name];
    if (!dc) {
      skip.push(name); continue;
    }
    const r = syncOneDemo(name, dc);
    if (r === 'skipped') skip.push(name);
    else if (r === 'warning') warn.push(name);
    else ok.push(name);
  }

  console.log('\n========================================');
  console.log('[sync-to-demos] 同步完成');
  if (ok.length) console.log(`  成功: ${ok.join(', ')}`);
  if (warn.length) console.log(`  警告: ${warn.join(', ')}`);
  if (skip.length) console.log(`  跳过: ${skip.join(', ')}`);
  console.log('========================================');
}

main();
