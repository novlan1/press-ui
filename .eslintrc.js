const { getESLintImportOrderRule, getESLintImportSettings } = require('t-comm');

module.exports = {
  root: true,
  extends: ['eslint-config-light'],
  globals: {
    app: true,
    need: true,
    uni: true,
    VConsole: true,
    wx: true,
    emonitor: true,
    globalVars: true,
    globalThis: true,
    ROUTES: true,
    getCurrentPages: true,
    AlipayJSBridge: true,
    $: true,
    qq: true,
    weex: true,
    plus: true,
  },
  settings: {
    ...getESLintImportSettings({
      aliasMap: [['press-ui', './src/packages']],
    }),
  },
  ignorePatterns: ['**/wxcomponents/*'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'vue/no-v-text-v-html-on-component': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: true,
      ignores: [
        'scroll-view',
        'transition',
        'swiper',
        'swiper-item',
        'web-view',
      ],
    }],
    'import/no-unresolved': [2,
      {
        ignore: [
          'node_modules',
          '@TIP_PLATFORM_NAME',
          '^@/*',
        ],
      },
    ],
    ...getESLintImportOrderRule(),
  },
};
