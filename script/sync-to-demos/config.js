/**
 * @description 同步配置：press-ui → 所有 demo 仓库
 *
 * 参考 tdesign-uniapp 的 example/script/watch/config.js 设计
 *
 * 每个 demo 的差异：
 *   cpList       - 需要从 press-ui/src/ 复制到 demo 的目录列表，默认放到 src/ 下
 *   cpMap        - （可选）指定某个目录的目标基准路径，覆盖默认的 src/
 *                  如 { pages: '.' } 表示 pages 放到项目根目录而非 src/pages
 *                  如 { packages: 'uni_modules/press-ui/components' } 表示按 uni-app 插件格式
 *   files        - （可选）需要同步的独立文件列表（相对于 press-ui/src/）
 *                  重要：这些文件可能因 Vue 版本/平台不同需要手动检查
 *   pathFix      - 是否修正 import 路径（src/packages/ → src/press-ui/src/packages/）
 *   pagesJson    - 是否为 uni-app 项目
 *   pagesJsonPath - pages.json 的位置（默认 src/pages.json，HBuilderX 项目用 '.'）
 *   appVue       - 是否复制 App.vue
 *   postInit     - 同步后额外执行的命令列表
 *
 * uni-app 插件格式（参考 tdesign-uniapp）：
 *   组件统一放到 uni_modules/{package-name}/components/
 *   这样 HBuilderX 项目可直接发布为 devcloud 插件
 */
const path = require('path');

const PRESS_UI_ROOT = path.resolve(__dirname, '../../');

// 所有 demo 公用的共享资源目录
const SHARED_DIRS = ['static', 'locale'];

// uni-app HBuilderX 项目：所有东西都放根目录（不用 src/）
//   cpMap 用 '.' 特殊值表示"在根目录下用 dir 名作为子目录"
const HX_BASE_DIR = '.';

// uni-app CLI 项目：默认放 src/ 下，无需 cpMap
//   仅当目标不在 src/ 时才需要 cpMap 显式声明

// uni-app 项目额外的共享目录
const UNI_APP_DIRS = ['windows'];

// uni-app CLI 项目额外同步的共享文件
const UNI_APP_FILES = ['uni.scss', 'index.js', 'index.scss', 'main.js'];

const config = {
  pressUiRoot: PRESS_UI_ROOT,
  pressUiSrc: path.resolve(PRESS_UI_ROOT, 'src'),

  demos: {
    // 1. HBuilderX + Vue3 + uni-app
    //    HBuilderX 项目所有内容直接放根目录，不走 src/
    //    组件作为 uni-app 插件放到 uni_modules/press-ui/components/
    //    可以直接发布为 devcloud 插件
    'vue3-hx': {
      dir: path.resolve(PRESS_UI_ROOT, '../press-ui-demo-vue3-hx'),
      cpList: ['pages', 'packages', 'static', 'locale', 'windows', 'utils'],
      cpMap: {
        pages: HX_BASE_DIR,
        // 按 item 分别映射：press-* + scroll-view 等放 components/，common/mixins/locale 平级
        packages: {
          // 注：cpMap 的值是"父目录"，item 名会作为子目录自动拼接
          'press-*': 'uni_modules/press-ui/components',
          'scroll-view': 'uni_modules/press-ui/components',
          swiper: 'uni_modules/press-ui/components',
          'swiper-item': 'uni_modules/press-ui/components',
          common: 'uni_modules/press-ui/components',
          mixins: 'uni_modules/press-ui/components',
          locale: 'uni_modules/press-ui/components',
        },
        static: HX_BASE_DIR,
        locale: HX_BASE_DIR,
        windows: HX_BASE_DIR,
        utils: HX_BASE_DIR,
      },
      // 过滤 demo/测试/文档等非组件文件
      cpFilter: {
        packages: {
          include: [
            'press-*', 'common', 'mixins', 'locale',
            'scroll-view', 'swiper', 'swiper-item',
          ],
          exclude: [
            'demo.vue', 'demo-data.*',
            '__tests__', 'tests', '*.test.*',
            'README*.md', 'index.d.ts',
          ],
        },
      },
      pathFix: false,
      pagesJson: true,
      pagesJsonPath: '.',
      appVue: false,
      postInit: [
        // 清理旧同步留下的 src/ 残留
        'rm -rf src/pages', 'rm -rf src/packages',
        'rm -rf src/static', 'rm -rf src/locale',
        'rm -rf src/windows', 'rm -rf src/utils',
        'rm -rf src/uni.scss', 'rm -rf src/main.js',
        'rm -rf src/index.js', 'rm -rf src/index.scss',
        // 清理 uni_modules/press-ui/ 下旧位置残留（如果之前同步放错位置了）
        'rm -rf uni_modules/press-ui/common',
        'rm -rf uni_modules/press-ui/mixins',
        'rm -rf uni_modules/press-ui/locale',
      ],
    },

    // 2. 纯 Vue3 项目（Vite）— 默认 src/ 结构，无需 cpMap
    'vue3-pure': {
      dir: path.resolve(PRESS_UI_ROOT, '../press-ui-demo-vue3-pure'),
      cpList: ['pages', 'utils', ...SHARED_DIRS],
      pathFix: false,
      pagesJson: false,
      appVue: false,
    },

    // 3. 纯 Vue2 项目（Vue CLI）— 默认 src/ 结构
    'vue2-pure': {
      dir: path.resolve(PRESS_UI_ROOT, '../press-ui-demo-vue2-pure'),
      cpList: ['packages', 'pages', 'utils', ...SHARED_DIRS],
      pathFix: true,
      pagesJson: false,
      appVue: false,
      postInit: [
        // 删除不需要的组件（当前项目不兼容）
        'rm -rf src/packages/press-hor-swiper-light',
      ],
    },

    // 4. uni-app + Vue2（CLI 模式，所有内容在 src/ 下）
    'vue2-uni': {
      dir: path.resolve(PRESS_UI_ROOT, '../press-ui-demo-vue2-uni'),
      cpList: ['pages', 'packages', 'utils', ...SHARED_DIRS, ...UNI_APP_DIRS],
      files: [...UNI_APP_FILES],
      pathFix: true,
      pagesJson: true,
      appVue: true,
    },
  },
};

module.exports = { config };
