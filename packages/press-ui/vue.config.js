const path = require('path');

const { DispatchScriptPlugin } = require('@tencent/webpack-plugin-dispatch-script')
const { DispatchVuePlugin } = require('@tencent/webpack-plugin-dispatch-vue')
const { ReplaceContentPlugin } = require('@tencent/webpack-plugin-replace-content')

const { RemToRpxPlugin } = require('@tencent/webpack-plugin-rem-to-rpx')
const { FixNpmPackagePlugin } = require('@tencent/webpack-plugin-fix-npm-package')
const { GenVersionMpPlugin, GenVersionWebPlugin } = require('@tencent/webpack-plugin-gen-version')

const { BUILD_NAME_MAP } = require('t-comm/lib/v-console/config');
const { LOADER: crossGameStyle } = require('@tencent/webpack-loader-cross-game-style')
const { LOADER: injectDynamicStyleMp } = require('@tencent/webpack-loader-inject-dynamic-style-mp')
const { LOADER: injectDynamicStyleWeb } = require('@tencent/webpack-loader-inject-dynamic-style-web')
const { LOADER: vLazy } = require('@tencent/webpack-loader-v-lazy')
const { LOADER: vueDirective } = require('@tencent/webpack-loader-vue-directive')


const LOADER_MAP = {
  crossGameStyle,
  injectDynamicStyleMp,
  injectDynamicStyleWeb,
  vLazy,
  vueDirective,
}
const plugins = [];

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
    ],
  }));

  if (process.env.NODE_ENV === 'production') {
    plugins.push(new DispatchVuePlugin({
      insertRequireVendor: true,
      moveComponents: {
        disableList: ['@zebra-ui'],
      },
    }));
    plugins.push(new DispatchScriptPlugin({
      addCommonVendorRequire: true,
      whiteList: [],
    }));
    plugins.push(new FixNpmPackagePlugin());
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
        'press-ui': path.resolve(__dirname, './src/packages/'),
      },
    },
    plugins,
  },
  transpileDependencies: ['@zebra-ui/swiper'],

  chainWebpack(config) {
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use(LOADER_MAP.vLazy)
      .loader(LOADER_MAP.vLazy)
      .options({
        platforms: ['mp-weixin', 'mp-qq', 'h5'],
      })
      .end()
      .use(LOADER_MAP.vueDirective)
      .loader(LOADER_MAP.vueDirective)
      .options({
        list: ['treport'],
        platforms: ['mp-weixin', 'mp-qq', 'h5'],
      })
      .end()
      .use(LOADER_MAP.injectDynamicStyleMp)
      .loader(LOADER_MAP.injectDynamicStyleMp)
      .options({
        topElement: '.demo-wrap',
        platforms: ['mp-qq', 'mp-weixin'],
      })
      .end()
      .use(LOADER_MAP.crossGameStyle)
      .loader(LOADER_MAP.crossGameStyle)
      .options({
        // platforms: ['h5'],
      })
      .end();

    config.module
      .rule('inject-dynamic-style-web')
      .test(/(css(\/|\\)base\.scss)$/)
      .use(LOADER_MAP.injectDynamicStyleWeb)
      .loader(LOADER_MAP.injectDynamicStyleWeb)
      .options({
        topElement: '.demo-wrap',
        platforms: ['h5'],
      })
      .end();
  },
};
