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

// packages 同步时要包含的顶层 item
//
// 用 '*' 全量包含 + 下面的 exclude 做黑名单，而不是逐个列白名单。
// 原因：之前白名单写死 ['press-*','common','mixins','locale','scroll-view','swiper','swiper-item']，
// 漏了 image/（press-image.vue 里 import '../image/index.vue'）和 types/，
// 导致 demo 报 "Failed to resolve import ../image/index.vue"。
// 主源以后新增任何非 press-* 的公共目录都会再踩一次，所以改成"默认全带走"。
const PACKAGES_INCLUDE = ['*'];

// 同时要剔除的 packages 顶层文件（npm 发包用，不属于组件源码）
//
// 重要：这些只应做「顶层」剔除，绝不能递归剔除！
// 尤其 index.js —— 组件目录里有 150+ 个 index.js，它们是目录引入的入口
// （如 `press-dialog-plus`、`common/functional-component/index`、`press-toast/index`）。
// 一旦递归剔除，这些目录引入会全部解析失败，verify 报断链。
const PACKAGES_ROOT_META = ['package.json', 'LICENSE', '.npmrc', 'index.js'];

// 同步时要「递归」剔除的"非运行时"文件（组件目录内也会出现，需全层级剔除）
//   demo.vue    - 页面已由 dispatch 生成到 pages/press/，组件包内不需要
//   tests       - 单测只在主源跑
//   README      - 文档只在主源/官网
// 注意：绝对不要加 demo-helper/！它是 pages/press/*.vue 的运行时依赖，
//      排除后 demo 仓库会 "Could not resolve .../demo-helper/xxx"。
//
// 顶层元文件（package.json / index.js 等）不能放 exclude 里——
// 因为 exclude 会被转成 rsync 的递归 --exclude（--exclude="**/xxx"），
// 会把组件目录内的 index.js 一起删掉。它们只应放 rootExclude 做顶层匹配。
const EXCLUDE_NON_RUNTIME = {
  include: PACKAGES_INCLUDE,
  rootExclude: [...PACKAGES_ROOT_META],
  exclude: [
    'demo.vue', 'demo-data.*',
    '__tests__', 'tests', '*.test.*',
    'README*.md', 'index.d.ts',
  ],
};

// vue2-pure / vue2-uni 把 packages 同步到 src/packages/ 当本地源码用。
// 这两个目录都在各自 .gitignore 里（属于同步生成的本地产物，不进 git），
// 所以不过滤 demo.vue / tests，保留便于本地调试；
// 但 packages 顶层的 npm 发包元文件仍要剔除，避免污染 demo 的 src/packages/。
const KEEP_ALL_FOR_LOCAL = {
  include: PACKAGES_INCLUDE,
  rootExclude: [...PACKAGES_ROOT_META],
  exclude: [],
};

const config = {
  pressUiRoot: PRESS_UI_ROOT,
  pressUiSrc: path.resolve(PRESS_UI_ROOT, 'src'),

  demos: {
    // 1. HBuilderX + Vue3 + uni-app
    //    HBuilderX 项目所有内容直接放根目录，不走 src/
    //    组件作为 uni-app 插件放到 uni_modules/press-ui/components/
    //    可以直接发布为 devcloud 插件
    'vue3-hx': {
      dir: path.resolve(PRESS_UI_ROOT, '../press-ui-demo-vue3-uni'),
      cpList: ['pages', 'packages', 'static', 'locale', 'windows', 'utils'],
      cpMap: {
        pages: HX_BASE_DIR,
        // packages 下所有 item（press-* / common / mixins / locale / image / swiper ...）
        // 统一平铺到 components/ 下，跟主源 src/packages/ 内部相对路径一一对应，
        // 这样组件里的 '../image/index.vue'、'../common/xxx' 等相对引用不用改写就能解析。
        //
        // 注意：这里不要退回"按 item 逐个列映射"的写法。
        // 之前那样写漏了 image/，press-image.vue 的 import '../image/index.vue' 直接解析失败。
        packages: 'uni_modules/press-ui/components',
        static: HX_BASE_DIR,
        locale: HX_BASE_DIR,
        windows: HX_BASE_DIR,
        utils: HX_BASE_DIR,
      },
      // 过滤 demo/测试/文档等非组件文件
      // 注意：demo-helper/ 不能排除！
      //   pages/press/*.vue 是从 packages/*/demo.vue 生成的（npm run init → dispatch），
      //   这些 demo 里会 import demo-helper 下的数据/工具，属于运行时依赖。
      //   排除后 demo 仓库会出现 "Could not resolve .../demo-helper/xxx" 编译失败。
      cpFilter: {
        packages: EXCLUDE_NON_RUNTIME,
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
        // HBuilderX 项目所有源码都在根目录，src/ 整体不再需要
        // （env.d.ts / shime-uni.d.ts / project/ 都是 CLI 时代遗留）
        // 逐个删而不是 rm -rf src：部分环境对整目录批量删除有安全拦截
        'rm -f src/env.d.ts src/shime-uni.d.ts',
        'rm -rf src/project',
        // 目录空了才删得掉，rmdir 失败不影响流程
        'rmdir src 2>/dev/null || true',
        // 清理 uni_modules/press-ui/ 下旧位置残留（如果之前同步放错位置了）
        'rm -rf uni_modules/press-ui/common',
        'rm -rf uni_modules/press-ui/mixins',
        'rm -rf uni_modules/press-ui/locale',
      ],
    },

    // 2. 纯 Vue3 项目（Vite）— 默认 src/ 结构，无需 cpMap
    //    组件走 npm 包 press-ui，页面里的 press-ui/xxx 保持原样
    'vue3-pure': {
      dir: path.resolve(PRESS_UI_ROOT, '../press-ui-demo-vue3-pure'),
      cpList: ['pages', 'utils', ...SHARED_DIRS],
      pathFix: false,
      pagesJson: false,
      appVue: false,
      // 组件走 npm 包时，press-ui 版本要跟主源对齐，否则新组件/新 demo-helper 解析不到
      alignPressUiDep: true,
    },

    // 3. 纯 Vue2 项目（Vue CLI）— 默认 src/ 结构
    //    packages 同步到 src/packages/，页面里 press-ui/xxx 走 npm 包
    'vue2-pure': {
      dir: path.resolve(PRESS_UI_ROOT, '../press-ui-demo-vue2-pure'),
      cpList: ['packages', 'pages', 'utils', ...SHARED_DIRS],
      cpFilter: { packages: KEEP_ALL_FOR_LOCAL },
      // pathFix 原本把 src/packages/ 改写成 src/press-ui/src/packages/（submodule 时代），
      // submodule 已移除，改写后的路径不存在，因此关闭
      pathFix: false,
      pagesJson: false,
      appVue: false,
      alignPressUiDep: true,
      postInit: [
        // 删除不需要的组件（当前项目不兼容）
        'rm -rf src/packages/press-hor-swiper-light',
        // 清理 submodule 时代残留
        'rm -rf src/press-ui',
      ],
    },

    // 4. uni-app + Vue2（CLI 模式，所有内容在 src/ 下）
    'vue2-uni': {
      dir: path.resolve(PRESS_UI_ROOT, '../press-ui-demo-vue2-uni'),
      cpList: ['pages', 'packages', 'utils', ...SHARED_DIRS, ...UNI_APP_DIRS],
      cpFilter: { packages: KEEP_ALL_FOR_LOCAL },
      files: [...UNI_APP_FILES],
      pathFix: false,
      pagesJson: true,
      appVue: true,
      alignPressUiDep: true,
      postInit: [
        'rm -rf src/press-ui',
      ],
    },
  },
};

module.exports = { config };
