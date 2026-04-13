/**
 * @description 监听组件包变化，自动同步文档文件
 */
const { moveDocs } = require('@plugin-light/cli/script/docs-demo/helper');
const { watchPackages } = require('@plugin-light/cli/script/docs-demo/watch');

function main() {
  moveDocs();

  watchPackages(moveDocs);
}

main();
