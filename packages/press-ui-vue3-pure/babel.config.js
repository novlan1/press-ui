const prodPlugins = [];
// if (process.env.NODE_ENV === 'production') {
//   prodPlugins.push('transform-remove-console');
// }

module.exports = {
  presets: [
    '@vue/app',
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true,
    }, 'vant'],
    ...prodPlugins,
  ],
  env: {
    test: {
      presets: [['@babel/preset-env', {
        targets: {
          node: 'current',
        },
      }]],
      plugins: [
        ['import', {
          libraryName: 'vant',
          style: false,
        }, 'vant'],
      ],
    },
  },
};
