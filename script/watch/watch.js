// 用于 press-ui-demo-vue2 等工程的开发监听
const path = require('path');
const gulp = require('gulp');
const { execCommand } = require('t-comm');

const watchTarget = [
  './src/press-ui/src/packages/**/*',
  './src/press-ui/src/pages/**/*',
  './src/press-ui/src/utils/**/*',
];

function watchPackages(cb) {
  gulp.watch(watchTarget, gulp.series(cb));
  console.log('[GULP] 正在监听 packages 文件夹...');
}

const EVENT_MAP = {
  COPY: 'COPY',
  REMOVE: 'REMOVE',
};
function getTargetFilePath(filePath) {
  return filePath.replace(/^src\/press-ui\/packages\/press-ui\//, '');
}

function handleTargetFile(filePath, type, handlePagesPress) {
  const from = filePath;
  const to = getTargetFilePath(from);
  const targetDir = path.dirname(to);

  if (type === EVENT_MAP.COPY) {
    execCommand(`mkdir -p ${targetDir} && cat ${from} > ${to}`);
    const reg = /src\/press-ui\/packages\/press-ui\/src\/packages\/press-([^/]+)\/demo.vue/;

    if (handlePagesPress && from.match(reg)) {
      const demoTarget = from.replace(reg, (a, b) => `src/pages/press/${b}/${b}.vue`);
      execCommand(`cat ${from} > ${demoTarget}`);
    }
  } else if (type === EVENT_MAP.REMOVE) {
    execCommand(`rm -rf ${from}`);
  }
}

function watchPressUI(handlePagesPress) {
  const watcher = gulp.watch(watchTarget);

  watcher.on('change', (path) => {
    console.log(`File ${path} was changed`);
    handleTargetFile(path, EVENT_MAP.COPY, handlePagesPress);
  });

  watcher.on('add', (path) => {
    console.log(`File ${path} was added`);
    handleTargetFile(path, EVENT_MAP.COPY, handlePagesPress);
  });

  watcher.on('unlink', (path) => {
    console.log(`File ${path} was removed`);
    handleTargetFile(path, EVENT_MAP.REMOVE, handlePagesPress);
  });

  // watcher.close();
  console.log('[GULP] 正在监听...');
}


module.exports = {
  watchPackages,
  watchPressUI,
};
