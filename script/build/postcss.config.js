module.exports = {
  parser: require('postcss-comment'),
  plugins: [
    require('autoprefixer')({
      remove: process.env.UNI_PLATFORM !== 'h5',
    }),
  ],
};
