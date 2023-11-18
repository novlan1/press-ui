const path = require('path');
const {
  RemToRpxPlugin,
  GenVersionMpPlugin,
  GenVersionWebPlugin,
  DispatchVuePlugin,
  ReplaceContentPlugin,
  //  DispatchScriptPlugin
} = require('uni-plugin-light/lib/plugin');
const { BUILD_NAME_MAP } = require('t-comm/lib/v-console/config');

const V_LAZY_LOADER = 'uni-plugin-light/lib/loader/v-lazy';
const INJECT_DYNAMIC_STYLE_WEB = 'uni-plugin-light/lib/loader/inject-dynamic-style-web';
const INJECT_DYNAMIC_STYLE_MP = 'uni-plugin-light/lib/loader/inject-dynamic-style-mp';

const CROSS_GAME_STYLE_LOADER = 'uni-plugin-light/lib/loader/cross-game-style';
const VUE_DIRECTIVE_LOADER = 'uni-plugin-light/lib/loader/vue-directive';
// const REPLACE_CONTENT_LOADER = 'uni-plugin-light/lib/loader/replace-content';

const plugins = [];
// const REPLACE_LIST = [
//   {
//     from: /\.\/pin\.svg/g,
//     to: '',
//     files: [
//       /[\s\S]*/,
//     ],
//   },
//   {
//     from: '@font-face',
//     to: 'FAKE',
//     files: [
//       /_layout-\w+\.scss/,
//     ],
//   },
// ];

if (process.env.UNI_PLATFORM !== 'h5') {
  plugins.push(new GenVersionMpPlugin());
  plugins.push(new RemToRpxPlugin({}));
  plugins.push(new ReplaceContentPlugin({
    replaceList: [
      {
        from: /@font-face[\s\S]*?{[\s\S]*?{[\s\S]*?}[\s\S]*?}/g,
        to: '',
        files: [/act-.*\.wxss/],
      },
      // 条件编译去掉会局部的 svg 引用
      // {
      //   from: /url\(.\/pin.svg\)/g,
      //   to: '',
      //   files: [/act-.*\.wxss/],
      // },
    ],
  }));

  if (process.env.NODE_ENV === 'production') {
    // plugins.push(new DispatchScriptPlugin());
    plugins.push(new DispatchVuePlugin({
      insertRequireVendor: true,
      moveComponents: {
        disableList: ['@zebra-ui'],
      },
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
  transpileDependencies: ['@zebra-ui/swiper'],
  chainWebpack(config) {
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use(V_LAZY_LOADER)
      .loader(V_LAZY_LOADER)
      .options({
        platforms: ['mp-weixin', 'mp-qq', 'h5'],
      })
      .end()
      .use(VUE_DIRECTIVE_LOADER)
      .loader(VUE_DIRECTIVE_LOADER)
      .options({
        list: ['treport'],
        platforms: ['mp-weixin', 'mp-qq', 'h5'],
      })
      .end()
      .use(INJECT_DYNAMIC_STYLE_MP)
      .loader(INJECT_DYNAMIC_STYLE_MP)
      .options({
        topElement: '.demo-wrap',
        platforms: ['mp-qq', 'mp-weixin'],
      })
      .end()
      // .use(REPLACE_CONTENT_LOADER)
      // .loader(REPLACE_CONTENT_LOADER)
      // .options({
      //   replaceList: REPLACE_LIST,
      //   platforms: ['mp-qq', 'mp-weixin'],
      // })
      // .end()
      .use(CROSS_GAME_STYLE_LOADER)
      .loader(CROSS_GAME_STYLE_LOADER)
      .options({
        // platforms: ['h5'],
      })
      .end();

    config.module
      .rule('inject-dynamic-style-web')
      .test(/(css\/base\.scss)$/)
      .use(INJECT_DYNAMIC_STYLE_WEB)
      .loader(INJECT_DYNAMIC_STYLE_WEB)
      .options({
        topElement: '.demo-wrap',
        platforms: ['h5'],
      })
      .end();
  },
};
