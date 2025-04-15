function loadEnv() {
  const path = require('../env/env-file')();
  require('dotenv').config({ path });
}

module.exports = loadEnv;
