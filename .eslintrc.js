module.exports = {
  root: true,
  extends: ['eslint-config-light'],
  globals: {
    getCurrentPages: true,
    qq: true,
    weex: true,
    plus: true,
  },
  settings: {
  },
  rules: {
    'vue/no-v-text-v-html-on-component': 0,
  },
};


