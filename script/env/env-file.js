/**
 * @description 获取本地环境变量文件路径 (.env.local)
 */
const path = require('path');


function getEnvFile() {
  const envPath = path.resolve(__dirname, '../../.env.local');
  return envPath;
}


module.exports = getEnvFile;
