const path = require('path');
// const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const Components = require('../../config/components.json');
const POSTCSS_CONFIG_FILE = path.resolve(__dirname, 'postcss.config.js');

const { LOADER: CROSS_GAME_STYLE_LOADER} = '@plugin-light/webpack-loader-cross-game-style';
const { LOADER: IF_DEF_LOADER} = '@plugin-light/webpack-loader-ifdef';
// const utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
// const mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
// const transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
const COMMON_EXTERNALS = {
  '@zebra-ui/swiper/components/z-swiper/z-swiper.vue': '@zebra-ui/swiper/components/z-swiper/z-swiper.vue',
  '@zebra-ui/swiper/components/z-swiper-item/z-swiper-item.vue': '@zebra-ui/swiper/components/z-swiper-item/z-swiper-item.vue',
  uqrcodejs: 'uqrcodejs',
  'vue-barcode': 'vue-barcode',
  'vue-qrcode': 'vue-qrcode',
  'weapp-qrcode-canvas-2d': 'weapp-qrcode-canvas-2d',
};

let externals = {
  ...COMMON_EXTERNALS,
};

function addExternalsForLightAndUI(externals, key, value) {
  externals[`element-ui/${key}`] = value;
  externals[`element-light/${key}`] = value;
}

Object.keys(Components).forEach((key) => {
  addExternalsForLightAndUI(externals, `packages/${key}`, `element-light/lib/${key}`);
  // externals[`element-ui/packages/${key}`] = `element-light/lib/${key}`;
});

// externals['element-ui/src/locale'] = 'element-light/lib/locale';
addExternalsForLightAndUI(externals, 'src/locale', 'element-light/lib/locale');

// utilsList.forEach((file) => {
//   file = path.basename(file, '.js');
//   // externals[`element-ui/src/utils/${file}`] = `element-light/lib/utils/${file}`;
//   addExternalsForLightAndUI(externals, `src/utils/${file}`, `element-light/lib/utils/${file}`);
// });

// mixinsList.forEach((file) => {
//   file = path.basename(file, '.js');
//   // externals[`element-ui/src/mixins/${file}`] = `element-light/lib/mixins/${file}`;
//   addExternalsForLightAndUI(externals, `src/mixins/${file}`, `element-light/lib/mixins/${file}`);
// });

// transitionList.forEach((file) => {
//   file = path.basename(file, '.js');
//   // externals[`element-ui/src/transitions/${file}`] = `element-light/lib/transitions/${file}`;
//   addExternalsForLightAndUI(externals, `src/transitions/${file}`, `element-light/lib/transitions/${file}`);
// });

externals = [Object.assign({
  vue: 'vue',
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'element-ui': path.resolve(__dirname, '../'),
  'element-light': path.resolve(__dirname, '../'),
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue',
};

const jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js|utils\/lodash\.js/;
exports.jsexclude = jsexclude;

exports.COMMON_EXTERNALS = COMMON_EXTERNALS;
const IF_DEF_LOADER_CONFIG = {
  loader: IF_DEF_LOADER,
  options: {
    context: { H5: true, VUE3: true },
    type: ['css', 'js', 'html'],
  },
};
exports.jsWebpackRule = {
  test: /\.(jsx?|babel|es6|ts)$/,
  include: process.cwd(),
  exclude: jsexclude,
  use: [
    'babel-loader',
    IF_DEF_LOADER_CONFIG,
  ],
};

exports.vueWebpackRule =  {
  test: /\.vue$/,
  use: [
    {
      loader: 'vue-loader',
      options: {
        compilerOptions: {
          preserveWhitespace: false,
        },
      },
    },
    {
      loader: CROSS_GAME_STYLE_LOADER,
      options: {
        styleName: 'none',
      },
    },
    IF_DEF_LOADER_CONFIG,
  ],
};

exports.tsWebpackRule = {
  test: /\.ts$/,
  use: 'ts-loader',
  exclude: /node-modules/,
};

exports.imgWebpackRule = {
  test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
  loader: 'url-loader',
  query: {
    limit: 10000,
    name: path.posix.join('static', '[name].[hash:7].[ext]'),
  },
};

exports.cssWebpackLoaderList = [
  // MiniCssExtractPlugin.loader,
  // 'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: POSTCSS_CONFIG_FILE,
      },
    },
  },
  IF_DEF_LOADER_CONFIG,
];
