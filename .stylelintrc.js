module.exports = {
  defaultSeverity: 'error',
  extends: ['stylelint-config-common'],
  plugins: ['stylelint-scss'],
  customSyntax: 'postcss-scss',
  rules: {
    'declaration-no-important': null,
    'selector-max-id': 10,
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,
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
