const path = require('path');
const { RemToRpxPlugin } = require('uni-plugin-light/lib/plugin');

const plugins = [];

if (process.env.VUE_APP_PLATFORM !== 'h5') {
  plugins.push(new RemToRpxPlugin());
}


module.exports = {
  configureWebpack: {
    devServer: {
      port: 9999,
    },
    resolve: {
      alias: {
        packages: path.resolve(__dirname, './packages'),
        src: path.resolve(__dirname, './src'),
      },
    },
    plugins,
  },

};
