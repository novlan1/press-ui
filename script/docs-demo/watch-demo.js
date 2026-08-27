/**
 * @description 监听组件包变化，自动同步 demo 文件
 */
const { moveDemo } = require('@plugin-light/cli/script/docs-demo/helper');
const { watchPackages } = require('@plugin-light/cli/script/docs-demo/watch');

const componentConfig = require('../../config/component-config.json');


function main() {
  moveDemo(null, componentConfig);

  watchPackages(moveDemo);
}

main();
