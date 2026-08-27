/**
 * @description 发版配置，定义需要删除的文件和路径映射
 */
const path = require('path');

/**
 * 发版时要从 npm 包里删除的文件
 *
 * 注意：不要加 'demo-helper/'！
 *   demo 仓库的 pages/press/*.vue（由 packages/* /demo.vue 经 dispatch 生成）
 *   会 import press-ui/xxx/demo-helper/yyy，属于运行时依赖。
 *   删掉后 vue2-pure / vue3-pure 等走 npm 包的 demo 会报
 *   "Could not resolve press-ui/press-protocol/demo-helper/data"。
 *   7 个 demo-helper 合计仅 ~84K，保留成本可忽略。
 */
const TO_DELETE_FILES = ['demo.vue', 'README.md', 'README.en-US.md', 'tests'];
const INNER_PATH_MAP = {
  TARGET_ROOT: './log',
  SOURCE_PACKAGES: './src/packages',
  TARGET_PACKAGES: './log/press-ui/components',
  PACKAGE_JSON: './src/packages/package.json',
  ROOT_PACKAGE_JSON: './package.json',

  SOURCE_README: './README.md',
  TARGET_README: './log/press-ui/components/README.md',

  SOURCE_CHANGELOG: './CHANGELOG.md',
  TARGET_CHANGELOG: './log/press-ui/components/CHANGELOG.md',
  DOC_TARGET_CHANGELOG: './docs/changelog.md',
};
const PROJECT_ROOT = path.resolve(__dirname, '../../');

const PATH_MAP = Object.keys(INNER_PATH_MAP).reduce((acc, item) => {
  acc[item] = path.resolve(PROJECT_ROOT, INNER_PATH_MAP[item]);
  return acc;
}, {});


module.exports = {
  TO_DELETE_FILES,
  INNER_PATH_MAP,
  PROJECT_ROOT,
  PATH_MAP,
};
