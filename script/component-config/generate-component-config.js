const path = require('path');

const { generateComponentConfig } = require('@plugin-light/cli/script/generate-component-config/core');

const componentConfig = require('../../config/component-config.json');

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
