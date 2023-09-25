function getNpmTipTemplate({
  prefix,
  link,
  postfix,
  feedbackTitle,
  feedbackList,
}) {
  return `${colorFactory(96)}${prefix} (${colorFactory(94)} ${link} ${colorFactory(96)}) ${postfix}${colorFactory()}\n\n`
  + `${colorFactory(96)}${feedbackTitle}${colorFactory()}\n`
  + `${feedbackList
    .map(feedback => `${colorFactory(96)}>${colorFactory(94)} ${feedback} ${colorFactory()}`)
    .join('\n')
  }\n`;
}


function getNpmTips({
  packageName,
  packageLink,
  packagePostfix,
  packagePostfixEn,
  feedbackList,
}) {
  const content = isUtf8Encoding()
    ? getNpmTipTemplate({
      prefix: `感谢您使用${packageName}`,
      link: packageLink,
      postfix: `${packagePostfix}！`,
      feedbackTitle: '如有任何疑问或建议，可通过下述渠道向我们反馈：',
      feedbackList,
    })
    : getNpmTipTemplate({
      prefix: `Thank you for using ${packageName}`,
      link: packageLink,
      postfix: `${packagePostfixEn}!`,
      feedbackTitle: 'If you have any issue or advice, you can give us feedback:',
      feedbackList,
    });


  return content;
}


function colorFactory(color) {
  if (!process.stdout.hasColors()) {
    return '';
  }
  return `\u001B[${color ?? 0}m`;
}

function isUtf8Encoding() {
  const { env: { LANG, LC_CTYPE } } = process;
  const language = (LANG ?? LC_CTYPE ?? '').toLowerCase();

  if (language.includes('utf-8') || language.includes('utf8')) {
    return true;
  }

  if (process.platform === 'win32') {
    return true;
  }

  return false;
}

function isShowInfo() {
  return true;
}

function npmInstallTip({
  packageName,
  packageLink,
  packagePostfix,
  packagePostfixEn,
  feedbackList,
}) {
  const content = getNpmTips({
    packageName,
    packageLink,
    packagePostfix,
    packagePostfixEn,
    feedbackList,
  });

  if (isShowInfo(content)) {
    console.log(content);
  }
}

npmInstallTip({
  packageName: 'Press UI',
  packageLink: 'https://github.com/novlan1/press-ui',
  packagePostfix: '组件库',
  packagePostfixEn: 'component library',
  feedbackList: [
    'https://github.com/novlan1/press-ui/issues',
    'wxwork://message?username=guowangyang',
  ],
});
