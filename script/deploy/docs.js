const { execSync } = require('child_process');
const ENV_FILE = '.env.local';

function main() {
  require('dotenv').config({ path: ENV_FILE });

  const sourceDir = 'docs/.vuepress/dist';
  const targetDir = '/root/html/press-ui';
  const hostName = process.env.HOST_NAME;
  const hostPwd =  process.env.HOST_PWD;

  execSync(`sh script/deploy/docs.sh ${sourceDir} ${targetDir} ${hostName} ${hostPwd}`, {
    stdio: 'inherit',
  });
}

main();
