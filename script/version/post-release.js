/**
 * @description 【第 3 步】发布后：推送 commit / tag + 企微版本通知
 *
 * 用法：
 *   pnpm release:step3                # 推送到当前分支的 upstream + 推 tag + 企微通知
 *   pnpm release:step3 -- --skip-push # 只发企微通知，不推送
 *
 * 说明：
 *   standard-version 已在第 1 步完成 commit + 打 tag（本地），
 *   这里负责把它们推到远端，并发送版本更新通知。
 */
const { execSync } = require('child_process');


function run(command) {
  console.log(`\n$ ${command}`);
  execSync(command, { stdio: 'inherit' });
}

function capture(command) {
  return execSync(command, { encoding: 'utf-8' }).trim();
}

/** 解析当前分支的 upstream，形如 private/develop -> { remote, branch } */
function resolveUpstream(branch) {
  try {
    const upstream = capture('git rev-parse --abbrev-ref "@{u}"');
    const slashIndex = upstream.indexOf('/');
    if (slashIndex > 0) {
      return {
        remote: upstream.slice(0, slashIndex),
        branch: upstream.slice(slashIndex + 1),
      };
    }
  } catch (e) {
    console.warn('⚠️  当前分支未设置 upstream，回退到 origin');
  }
  return { remote: 'origin', branch };
}


function main() {
  const skipPush = process.argv.includes('--skip-push');
  const { version } = require('../../package.json');

  console.log(`🚀 [Step 3] press-ui@${version} 发布后处理`);

  if (skipPush) {
    console.log('⏭️  [--skip-push] 跳过 git push');
  } else {
    const branch = capture('git branch --show-current');
    const { remote, branch: remoteBranch } = resolveUpstream(branch);

    console.log(`🚀 [推送] ${branch} -> ${remote}/${remoteBranch}`);
    run(`git push ${remote} ${branch}:${remoteBranch}`);
    run(`git push ${remote} --tags`);
  }

  console.log('\n🚀 [企微通知] 发送版本更新提示');
  run('npm run version:tip');

  console.log(`\n✅ [Step 3 完成] press-ui@${version} 发版流程结束。\n`);
}


main();
