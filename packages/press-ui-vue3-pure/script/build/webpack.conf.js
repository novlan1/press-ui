const path = require('path');
const sass = require('sass');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./config');
// const ENTRY = path.resolve(__dirname, '../../../press-ui/src/index.js');
const ENTRY = path.resolve(__dirname, '../../src/index.js');

module.exports = {
  mode: 'production',
  entry: {
    app: [ENTRY],
  },
  output: {
    path: path.resolve(__dirname, '../../', './lib'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'PRESS_UI',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    alias: config.alias,
  },
  externals: {
    vue: config.vue,
    ...config.COMMON_EXTERNALS,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  performance: {
    hints: false,
  },
  stats: {
    // children: false,
  },
  module: {
    rules: [
      config.jsWebpackRule,
      config.vueWebpackRule,
      {
        test: /\.css$/,
        use: [
          ...config.cssWebpackLoaderList,
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          ...config.cssWebpackLoaderList,
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
      config.tsWebpackRule,
      config.imgWebpackRule,
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
  ],
};
