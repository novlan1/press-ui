'use strict';

const { src, dest } = require('gulp');
const path = require('path');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

function compile() {
  return src(path.resolve(__dirname, '../../src/index.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({
      browsers: ['ie > 9', 'last 2 versions'],
      cascade: false,
    }))
    .pipe(cssmin())
    .pipe(dest('./lib'));
}

// function copyfont() {
//   return src('./src/fonts/**')
//     .pipe(cssmin())
//     .pipe(dest('./lib/fonts'));
// }

// exports.build = series(compile, copyfont);
compile();
