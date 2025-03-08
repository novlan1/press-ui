module.exports = {
  root: true,
  extends: ['eslint-config-light-vue3'],
  globals: {
    getCurrentPages: true,
    uni: true,
    globalThis: true,
    qq: true,
  },
  parserOptions: {
    project: 'tsconfig.eslint.json',
    ecmaVersion: 'latest',
    extraFileExtensions: ['.vue'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          // 这里参照webpack的别名配置映射
          ['src', './src'],
        ],
        // 告诉resolver-alias有哪些后缀的文件要解析
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
      },
    },
    'import/ignore': ['node_modules'],
  },
  rules: {

  },
};
