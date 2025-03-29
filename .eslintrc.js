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
          ['src', './packages/press-ui/src'],
        ],
        // 告诉resolver-alias有哪些后缀的文件要解析
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
      },
    },
    'import/ignore': ['node_modules'],
  },
  ignorePatterns: ['**/wxcomponents/*'],
  parserOptions: {
    // project: 'tsconfig.json',
    // tsconfigRootDir: __dirname,
    // sourceType: 'module',

    ecmaVersion: 12,
  },
  rules: {
    // 'import/order': [
    //   'error',
    //   {
    //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    //     'newlines-between': 'always-and-inside-groups',
    //     alphabetize: {
    //       order: 'asc',
    //       caseInsensitive: false,
    //     },
    //     pathGroups: [
    //       {
    //         pattern: 'react',
    //         group: 'external',
    //         position: 'before',
    //       },
    //       {
    //         pattern: '@/**',
    //         group: 'internal',
    //         position: 'before',
    //       },
    //     ],
    //     pathGroupsExcludedImportTypes: ['builtin'],
    //   },
    // ],
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
          // '^src/component/*',
          // '^src/logic/*',
          // '^src/page/*',
          '@TIP_PLATFORM_NAME',
          '^@/*',
        ],
      },
    ],
  },
};
