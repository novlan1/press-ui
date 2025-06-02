const { execSync } = require('child_process');

const { timeStampFormat } = require('t-comm');

const ENV_FILE = '.env.local';
require('dotenv').config({ path: ENV_FILE });

const DEPLOY_CONFIG = {
  repo: 'docs',
  user: 'novlan1',
  email: '1576271227@qq.com',

  targetDir: './docs/.vuepress/dist/',
  token: process.env.ACCESS_TOKEN || process.env.DEPLOY_GITHUB_PAGE_TOKEN || '',
  branch: 'main',

  commitMessage: `docs: update docs of press-ui. ${timeStampFormat(Date.now(), 'yyyy-MM-dd hh:mm:ss')}`,
  playgroundDir: './log/deploy-github-pages-playground',
  targetDirName: 'press-ui',
};


function main() {
  execSync(`npx t-comm deploy:github --repo ${DEPLOY_CONFIG.repo} \
    --user ${DEPLOY_CONFIG.user} \
    --email ${DEPLOY_CONFIG.email} \
    --dir ${DEPLOY_CONFIG.targetDir} \
    --token "${DEPLOY_CONFIG.token}" \
    --branch ${DEPLOY_CONFIG.branch} \
    --increment 1 \
    --message "${DEPLOY_CONFIG.commitMessage}" \
    --playgroundDir "${DEPLOY_CONFIG.playgroundDir}" \
    --targetDirName ${DEPLOY_CONFIG.targetDirName}
    `, {
    stdio: 'inherit',
  });
}

main();
