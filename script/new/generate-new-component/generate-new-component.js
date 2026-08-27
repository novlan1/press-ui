/**
 * @description 创建新组件脚手架，基于模板生成组件文件
 */
const path = require('path');

const { generateNewComponent } = require('../@plugin-light/cli/script/generate-new-component/generate-new-component');

const COMPONENT_CONFIG_PATH = path.resolve(process.cwd(), '.../../config/component-config.json');


function main() {
  generateNewComponent(COMPONENT_CONFIG_PATH);
}

main();

