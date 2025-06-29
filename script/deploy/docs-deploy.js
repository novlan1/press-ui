const { execSync } = require('child_process');
const ENV_FILE = '.env.local';

const deployType = process.argv[2];
const CONFIG = {
  DOCS_SOURCE: 'docs/.vuepress/dist',
  DOCS_TARGET: '/root/html/press-ui',
  DEMO_SOURCE: 'dist/build/h5',
  DEMO_TARGET: '/root/html/press-ui-demo',
};

console.log('deployType', deployType);

function main() {
  require('dotenv').config({ path: ENV_FILE });

  const sourceDir = deployType === 'demo' ? CONFIG.DEMO_SOURCE : CONFIG.DOCS_SOURCE;
  const targetDir =  deployType === 'demo' ? CONFIG.DEMO_TARGET : CONFIG.DOCS_TARGET;
  const hostName = process.env.HOST_NAME;
  const hostPwd =  process.env.HOST_PWD;

  execSync(`npx t-comm publish -s ${sourceDir} -t ${targetDir} -n ${hostName} -p "${hostPwd}"`, {
    stdio: 'inherit',
  });
}

main();
