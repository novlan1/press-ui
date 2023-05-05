
const path = require('path');
const childProcess = require('child_process');

/**
 * 复制目录
 */
function CopyHandler() {
}

/**
 * 复制目录
 * @param src 相对于process.env.UNI_INPUT_DIR目录
 * @param dst 相对于process.env.UNI_INPUT_DIR目录
 * @returns {boolean} 成功失败
 */
CopyHandler.prototype.run = function run(src, dst) {
  const root = process.env.UNI_INPUT_DIR;
  const srcDir = path.resolve(root, src);
  const dstDir = path.resolve(root, dst);

  const result = childProcess.spawnSync('cp', ['-rf', srcDir, dstDir]);
  if (result.error) {
    console.log(result.error);
    return false;
  }
  return true;
};

module.exports = CopyHandler;
