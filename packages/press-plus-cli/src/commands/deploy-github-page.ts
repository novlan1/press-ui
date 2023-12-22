import * as path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';


const ENV_FILE = '.env.local';
const BASH_FILE = path.resolve(__dirname, '../../../', './bash/deploy-github-page.sh');

export function deployGithubPage(options: Record<string, any>) {
  dotenv.config({ path: ENV_FILE });
  const { env } = process;

  const repoName = options.repoName || env.DEPLOY_GITHUB_PAGE_REPO_NAME;
  const userName = options.userName || env.DEPLOY_GITHUB_PAGE_USER_NAME;
  const email = options.email || env.DEPLOY_GITHUB_PAGE_EMAIL;
  const targetDir = options.targetDir || env.DEPLOY_GITHUB_PAGE_TARGET_DIR;
  const token = options.token || env.DEPLOY_GITHUB_PAGE_TOKEN;
  const commitMessage = options.commitMessage || env.DEPLOY_GITHUB_PAGE_COMMIT_MESSAGE || '';

  console.log('[DEPLOY]', {
    repoName,
    userName,
    email,
    targetDir,
    token,
    commitMessage,
  });

  if (!repoName
     || !userName
     || !email
     || !targetDir
     || !token
  ) {
    console.error('[DEPLOY ERROR] 信息不全');
    return;
  }

  execSync(`sh ${BASH_FILE} ${token} ${repoName} ${userName} ${email} ${targetDir} "${commitMessage}"`, {
    cwd: process.cwd(),
    encoding: 'utf-8',
    stdio: 'inherit',
  });
}

