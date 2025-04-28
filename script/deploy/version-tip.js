const { genVersionTip, batchSendWxRobotMarkdown  } = require('t-comm');

const { DEPLOY_CONFIG } = require('../../config/deploy-config');
const pkg = require('../../package.json');

function main() {
  const webhookUrl = DEPLOY_CONFIG.VERSION_TIP_WEBHOOK_URL;
  console.log('webhookUrl: ', webhookUrl);

  const content = genVersionTip({
    appInfo: pkg,
    showNpmLink: false,
    readmeFilePath: './CHANGELOG.md',
  });

  console.log('content:\n', content);

  batchSendWxRobotMarkdown({
    content,
    chatId: 'ALL',
    webhookUrl,
  });
}

main();
