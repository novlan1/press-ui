const fs = require('fs');
const { hyphenate } = require('t-comm/lib/base/string/string');

const reg = /\|(.*)\|(.*)\|(.*)\|(.*)\|/g;


const filePathList = [
  // 'src/packages/press-dialog/README.md',
  // 'src/packages/press-hor-match-index/README.md',
  // 'src/packages/press-message-board/README.md',
  // 'src/packages/press-message-detail/README.md',
  // 'src/packages/press-message-list/README.md',
  // 'src/packages/press-popup-cell/README.md',
  // 'src/packages/press-schedule-tree/README.md',
  // 'src/packages/press-schedule-list/README.md',
  // 'src/packages/press-turntable/README.md',

  'src/packages/press-act-tip-dialog/README.md',
  'src/packages/press-icon/README.md',
  'src/packages/press-loading/README.md',
  'src/packages/press-pagination/README.md',
  'src/packages/press-picker/README.md',
  'src/packages/press-popover/README.md',
  'src/packages/press-popup/README.md',
];

function formatPropsType(type) {
  if (/(^[-]+$)|[\u4e00-\u9fa5]/.test(type)) {
    return type;
  }
  return type.replace(/^_|_$/g, '').toLowerCase()
    .replace(/^|$/g, '_');
}
function replaceFile(file) {
  const data = fs.readFileSync(file, {
    encoding: 'utf-8',
  });

  const resultData = data.replace(reg, (...props) => {
    const strList = [
      hyphenate(props[1].trim()),
      props[2].trim(),
      formatPropsType(props[3].trim()),
      props[4].trim(),
    ];
    return `|${strList.join('|')}|`;
  });

  fs.writeFileSync(file, resultData, {
    encoding: 'utf-8',
  });
}

function main() {
  for (const file of filePathList) {
    replaceFile(file);
  }
}

main();
