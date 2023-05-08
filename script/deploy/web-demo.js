const { execSync } = require('child_process');
const ENV_FILE = '.env.local';


function main() {
  require('dotenv').config({ path: ENV_FILE });

  const token = process.env.GITHUB_TOKEN;

  execSync(`sh script/deploy/web-demo.sh ${token}`, {
    stdio: 'inherit',
  });
}

main();
