/**
 * @description 发版前预提交检查脚本（standard-version 的 postchangelog 钩子）
 *
 * 默认行为：同步版本号 → 生成 log/press-ui/components 产物 → git add → npm publish。
 *
 * 若设置环境变量 SKIP_NPM_PUBLISH=1，则跳过最后的 npm publish，
 * 只做「同步版本号 + 生成产物 + git add」，便于开箱 2FA(OTP) 场景下手动发布：
 *   1. pnpm release:step1        # 版本号/CHANGELOG/tag/产物（不 publish）
 *   2. pnpm release:step2 -- 123456   # 手动带 OTP 发布
 *   3. pnpm release:step3        # 推送 + 企微通知
 */
const {
  preCommit,
} = require('@plugin-light/cli/script/release/press/pre-commit');

const { preCommitWithoutPublish } = require('./pre-commit-no-publish');


function main() {
  const config = require('./config');

  if (process.env.SKIP_NPM_PUBLISH === '1') {
    console.log('🚀 [SKIP_NPM_PUBLISH=1] 跳过 npm publish，仅生成产物');
    preCommitWithoutPublish(config);
    return;
  }

  preCommit(config);
}


main();
