/**
 * @description 分发 demo 和文档文件到对应目录
 */
const path = require('path');

const { moveDemo, moveDocs } = require('@plugin-light/cli/script/docs-demo/helper');

function main() {
  moveDemo(null, null, {
    toDeleteDirs: [
      path.resolve(__dirname, '../../src/pages/press'),
    ],
  });
  console.log();
  moveDocs();
}

main();
