function loadEnv() {
  const path = require('path').resolve(process.cwd(), '.env.local');
  require('dotenv').config({ path });
}

module.exports = loadEnv;
