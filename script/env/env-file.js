const path = require('path');


function getEnvFile() {
  const envPath = path.resolve(__dirname, '../../.env.local');
  return envPath;
}


module.exports = getEnvFile;
