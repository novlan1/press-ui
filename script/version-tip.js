const { genVersionTip, batchSendWxRobotMarkdown  } = require('t-comm');
const pkg = require('../package.json');

function main() {
  const webhookUrl = 'PRESS_UI_ROBOT___60b39ee3-5f01-43fe-83f6-7875e0f16b77';
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
