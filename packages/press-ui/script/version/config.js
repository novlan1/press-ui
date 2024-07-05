const path = require('path');

const TO_DELETE_FILES = ['demo.vue', 'README.md', 'README.en-US.md', 'demo-helper/', 'tests'];
const INNER_PATH_MAP = {
  TARGET_ROOT: 'log',
  SOURCE_PACKAGES: 'src/packages',
  TARGET_PACKAGES: 'log/press-ui/components',
  PACKAGE_JSON: './src/packages/package.json',
  ROOT_PACKAGE_JSON: './package.json',
  SOURCE_README: '../../README.md',
  TARGET_README: './log/press-ui/components/README.md',
};
const PROJECT_ROOT = path.resolve(__dirname, '../../../../');
const PROJECT_ROOT_PKG = path.resolve(PROJECT_ROOT, './package.json');

const PATH_MAP = Object.keys(INNER_PATH_MAP).reduce((acc, item) => {
  acc[item] = path.resolve(__dirname, '../../', INNER_PATH_MAP[item]);
  return acc;
}, {});


module.exports = {
  TO_DELETE_FILES,
  INNER_PATH_MAP,
  PROJECT_ROOT,
  PROJECT_ROOT_PKG,
  PATH_MAP,
};
