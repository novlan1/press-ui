const path = require('path');
const {
  RemToRpxPlugin,
  GenVersionMpPlugin,
  GenVersionWebPlugin,
  DispatchVuePlugin,
  //  DispatchScriptPlugin
} = require('uni-plugin-light/lib/plugin');
const V_LAZY_LOADER = 'uni-plugin-light/lib/loader/v-lazy';
const { BUILD_NAME_MAP } = require('t-comm/lib/v-console/config');

const plugins = [];

if (process.env.UNI_PLATFORM !== 'h5') {
  plugins.push(new GenVersionMpPlugin());
  plugins.push(new RemToRpxPlugin({}));

  if (process.env.NODE_ENV === 'production') {
    // plugins.push(new DispatchScriptPlugin());
    plugins.push(new DispatchVuePlugin({
      insertRequireVendor: true,
    }));
  }
} else {
  plugins.push(new GenVersionWebPlugin({
    buildName: BUILD_NAME_MAP.build,
    commitName: BUILD_NAME_MAP.commit,
    delay: 1,
  }));
}


module.exports = {
  configureWebpack: {
    devServer: {
      port: 9999,
      // 防止报错：Invalid Host header
      disableHostCheck: true,
    },
    resolve: {
      alias: {
        packages: path.resolve(__dirname, './packages'),
        src: path.resolve(__dirname, './src'),
      },
    },
    plugins,
    // module: {
    //   rules: [
    //     {
    //       test: /\.vue$/,
    //       use: {
    //         loader: V_LAZY_LOADER,
    //         options: {
    //           platforms: ['mp-weixin', 'mp-qq', 'h5'],
    //         },
    //       },
    //     },
    //   ],
    // },
  },
  chainWebpack(config) {
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use(V_LAZY_LOADER)
      .loader(V_LAZY_LOADER)
      .options({
        platforms: ['mp-weixin', 'mp-qq', 'h5'],
      })
      .end();
  },
};
