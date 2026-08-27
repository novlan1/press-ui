/**
 * @description 发版后发送版本更新提示到企业微信
 */
const { sendVersionTip } = require('@plugin-light/cli/script/release/version-tip/index');

const { DEPLOY_CONFIG } = require('../../config/deploy-config');
const pkg = require('../../package.json');


function main() {
  const webhookUrl = DEPLOY_CONFIG.VERSION_TIP_WEBHOOK_URL;

  sendVersionTip({
    readmeFilePath: './CHANGELOG.md',
    appInfo: pkg,
    webhookUrl,
  });
}

main();
