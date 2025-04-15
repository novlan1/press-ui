const { writeFileSync } = require('t-comm');

const {
  IS_INNER_DOCS,
} = require('../utils/utils');


const PATH_MAP = {
  DOC_SIDE_BAR_CONFIG: `./${IS_INNER_DOCS ? 'docs/' : ''}docs/.vuepress/sidebar/sidebar.json`,
  DOC_SIDE_BAR_EN_CONFIG: `./${IS_INNER_DOCS ? 'docs/' : ''}docs/.vuepress/sidebar/sidebar-en.json`,

  DEMO_INDEX_CONFIG: 'src/pages/index/page-config.json',
  DEMO_PAGES_JSON: './src/pages.json',
  DEMO_I18N: 'src/utils/i18n/title-i18n.json',

  BUILD_CONFIG: 'config/components.json',
  SRC_INDEX: 'src/index.js',
};


function saveJsonToFile(filePath, data) {
  writeFileSync(filePath, data, true);
}


module.exports = {
  PATH_MAP,
  saveJsonToFile,
};
