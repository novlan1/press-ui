const gulp = require('gulp');

function watchPackages(cb) {
  gulp.watch('./src/packages/**/*', gulp.series(cb));
  console.log('[GULP] 正在监听 packages 文件夹...');
}

module.exports = {
  watchPackages,
};
