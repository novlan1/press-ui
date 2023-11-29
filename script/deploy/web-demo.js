const { execSync } = require('child_process');

const ENV_FILE = '.env.local';
const REPO = 'press-ui-demo';
const TARGET_DIR = 'dist/build/h5';


function main() {
  require('dotenv').config({ path: ENV_FILE });

  execSync(`npx t-comm deploy:github --repo ${REPO} --dir ${TARGET_DIR}`, {
    stdio: 'inherit',
  });
}

main();
