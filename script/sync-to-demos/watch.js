/**
 * @description 监听模式：press-ui 源文件变化时，自动推送到所有 demo 仓库
 *
 * 设计参考 tdesign-uniapp 的 gulp-watch 模式
 *
 * 用法：
 *   node script/sync-to-demos/watch
 *   npm run sync:demos:watch
 */
const fs = require('fs');
const path = require('path');

let gulp;
try {
  gulp = require('gulp');
} catch (e) {
  console.error('[sync:demos:watch] 缺少 gulp 依赖，请执行: npm install gulp --save-dev');
  process.exit(1);
}

const { config } = require('./config');

// ============================================================
// 增量同步：单个文件变化时，只复制该文件到各 demo
// ============================================================

/**
 * 从文件路径中提取相对路径（相对于 press-ui/src/）
 * 如：src/packages/press-button/demo.vue → packages/press-button/demo.vue
 */
function getRelativePath(filePath) {
  return path.relative(config.pressUiSrc, filePath);
}

/**
 * 判断文件属于哪个目录类别（pages / packages / utils）
 */
function getCategory(relativePath) {
  const firstDir = relativePath.split(path.sep)[0];
  if (['pages', 'packages', 'utils'].includes(firstDir)) {
    return firstDir;
  }
  return null;
}

/**
 * 增量同步单个文件到指定 demo
 */
function syncOneFile(demoConfig, category, sourcePath) {
  const relativePath = getRelativePath(sourcePath);
  const targetPath = path.resolve(demoConfig.dir, 'src', relativePath);

  try {
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
  } catch (e) {
    console.warn(`  [warn] 增量同步失败: ${relativePath} → ${demoConfig.dir}`);
  }
}

/**
 * 删除指定 demo 中的对应文件
 */
function removeOneFile(demoConfig, sourcePath) {
  const relativePath = getRelativePath(sourcePath);
  const targetPath = path.resolve(demoConfig.dir, 'src', relativePath);

  try {
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
      console.log(`  [remove] ${relativePath}`);
    }
  } catch (e) {
    // 忽略
  }
}

/**
 * 分发单文件变化到所有 demo
 */
function dispatchFileChange(filePath, action) {
  const relativePath = getRelativePath(filePath);
  const category = getCategory(relativePath);

  if (!category) return;

  console.log(`[${action}] ${relativePath}`);

  for (const [_name, demoConfig] of Object.entries(config.demos)) {
    if (!demoConfig.cpList.includes(category)) continue;
    if (!fs.existsSync(demoConfig.dir)) continue;

    if (action === 'unlink') {
      removeOneFile(demoConfig, filePath);
    } else {
      syncOneFile(demoConfig, category, filePath);
    }
  }
}

// ============================================================
// 监听模式
// ============================================================

function main() {
  const watchPaths = [
    path.resolve(config.pressUiSrc, 'packages/**/*'),
    path.resolve(config.pressUiSrc, 'pages/**/*'),
    path.resolve(config.pressUiSrc, 'utils/**/*'),
  ];

  console.log('[sync:demos:watch] 开始监听...');
  console.log('[sync:demos:watch] watch paths:');
  watchPaths.forEach(p => console.log(`  ${p}`));
  console.log(`[sync:demos:watch] targets: ${Object.keys(config.demos).join(', ')}\n`);

  const watcher = gulp.watch(watchPaths);

  watcher.on('change', (filePath) => {
    dispatchFileChange(filePath, 'change');
  });

  watcher.on('add', (filePath) => {
    dispatchFileChange(filePath, 'add');
  });

  watcher.on('unlink', (filePath) => {
    dispatchFileChange(filePath, 'unlink');
  });

  console.log('[sync:demos:watch] 监听已启动，按 Ctrl+C 停止\n');
}

main();
