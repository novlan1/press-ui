const { moveDemo } = require('@plugin-light/cli/script/docs-demo/helper');
const { watchPackages } = require('@plugin-light/cli/script/docs-demo/watch');

const componentConfig = require('../../config/component-config.json');


function main() {
  moveDemo(null, componentConfig);

  watchPackages(moveDemo);
}

main();
