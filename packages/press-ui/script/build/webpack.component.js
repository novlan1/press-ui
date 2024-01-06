const path = require('path');
const sass = require('sass');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Components = require('../../config/components.json');
const config = require('./config');

const newComponents = Object.keys(Components).reduce((acc, key) => {
  acc[key] = Components[key].replace('./src/packages', './src/press-ui/src/packages');
  return acc;
}, {});

const webpackConfig = {
  mode: 'production',
  entry: newComponents,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.ts'],
    // alias: config.alias,
    modules: ['node_modules'],
  },
  externals: config.externals,
  performance: {
    hints: false,
  },
  // stats: 'none',
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      config.jsWebpackRule,
      config.vueWebpackRule,
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          ...config.cssWebpackLoaderList,
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'theme-chalk/[name].css',
    }),
  ],
};

module.exports = webpackConfig;
