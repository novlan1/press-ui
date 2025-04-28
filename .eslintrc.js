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
    'import/resolver': {
      alias: {
        map: [
          // 这里参照webpack的别名配置映射
          ['src', './src'],
          ['press-ui', './src/packages'],
        ],
        // 告诉resolver-alias有哪些后缀的文件要解析
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
      },
    },
    'import/ignore': ['node_modules'],
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
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always-and-inside-groups',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'vite',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
