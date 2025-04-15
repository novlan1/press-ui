module.exports = {
  root: true,
  defaultSeverity: 'error',
  extends: ['stylelint-config-common'],
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-html',
  overrides: [
    {
      files: ['**/*.{scss,css,sass,vue}'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    // 忽略 border-top: none; 等
    'declaration-property-value-disallowed-list': { '/^border$/': ['none'] },
    'declaration-no-important': null,
    'selector-max-id': 10,

    'selector-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
    'at-rule-no-vendor-prefix': null,
    'media-feature-name-no-vendor-prefix': null,

    // 不处理 @include
    'at-rule-empty-line-before': null,

    // 不处理 at-rules，防止优先级被改动，导致异常
    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/order/README.md
    'order/order': [
      'declarations',
      'rules',
    ],
  },
};
