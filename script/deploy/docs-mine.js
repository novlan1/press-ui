const { execSync } = require('child_process');
const { DEPLOY_CONFIG } = require('../../config/deploy-config');

const ENV_FILE = '.env.local';
const REPO = DEPLOY_CONFIG.DOCS_REPO;
const TARGET_DIR = 'docs/.vuepress/dist';


function main() {
  require('dotenv').config({ path: ENV_FILE });

  execSync(`npx t-comm deploy:github --repo ${REPO} --dir ${TARGET_DIR}`, {
    stdio: 'inherit',
  });
}

main();
