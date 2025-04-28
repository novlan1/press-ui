const path = require('path');

const { generateNewComponent } = require('../../../src/packages/script/generate-new-component/generate-new-component');

const COMPONENT_CONFIG_PATH = path.resolve(process.cwd(), '.../../config/component-config.json');


function main() {
  generateNewComponent(COMPONENT_CONFIG_PATH);
}

main();

