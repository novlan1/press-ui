const { watchPackages } = require('../../src/packages/script/docs-demo/watch');
const { moveDemo } = require('../../src/packages/script/docs-demo/helper');
const componentConfig = require('../../config/component-config.json');


function main() {
  moveDemo(null, componentConfig);

  watchPackages(moveDemo);
}

main();
