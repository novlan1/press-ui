module.exports = {
  root: true,
  extends: ['eslint-config-light'],
  globals: {
    getCurrentPages: true,
    qq: true,
    weex: true,
    plus: true,
  },
  rules: {
    'vue/no-v-text-v-html-on-component': 0,
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
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};


