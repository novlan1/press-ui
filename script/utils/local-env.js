/**
 * @description 加载本地环境变量 (.env.local)
 */
function loadEnv() {
  const path = require('../env/env-file')();
  require('dotenv').config({ path });
}

module.exports = loadEnv;
