const path = require('path');
const componentConfig = require('../../config/component-config.json');
const { generateComponentConfig } = require('../../src/packages/script/generate-component-config/core');

const SCSS_PATH = path.resolve(__dirname, '../../src/index.scss');
const GLOB_MATCH = path.resolve(__dirname, '../../src/packages/press-*/press-*.vue');
const targetDir = path.resolve(__dirname, '../../src');

function main() {
  generateComponentConfig({
    componentConfig,
    scssPath: SCSS_PATH,
    globMatch: GLOB_MATCH,
    targetDir,
  });
}

main();
