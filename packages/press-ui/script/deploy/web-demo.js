const { execSync } = require('child_process');
const { DEPLOY_CONFIG } = require('../../config/deploy-config');

const ENV_FILE = require('../env/env-file')();
const REPO = DEPLOY_CONFIG.DEMO_REPO;
const TARGET_DIR = 'dist/build/h5';


function main() {
  require('dotenv').config({ path: ENV_FILE });

  execSync(`npx t-comm deploy:github --repo ${REPO} --dir ${TARGET_DIR}`, {
    stdio: 'inherit',
  });
}

main();
