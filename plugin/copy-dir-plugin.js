const childProcess = require('child_process');

class CopyDirPlugin {
  // {dirs:[{from,to}]}
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // 编译后处理
    compiler.hooks.done.tap('CopyDirPlugin', () => {
      this.move();
    });
  }
  move() {
    const { dirs = [] } = this.options;
    dirs.forEach((dir) => {
      if (dir.from && dir.to) {
        const result = childProcess.spawnSync('cp', ['-rf', dir.from, dir.to]);
        if (result.error) {
          console.log(result.error);
        }
      }
    });
  }
}

module.exports = CopyDirPlugin;
