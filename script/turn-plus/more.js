/**
 * @description 批量执行 press-plus 内容替换
 */
const { replaceContent } = require('t-comm');

const { CONFIG } = require('./config');

function main() {
  replaceContent({
    replaceList: [
      {
        list: [
          ['DialogPlus', 'Dialog'],
        ],
        dirList: [
          'src/packages/press-dialog-plus/handler.js',
          'src/packages/press-dialog/handler.js',
        ],
      },
    ],
    targetProject: CONFIG.targetProject,
  });
}


main();
