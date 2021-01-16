const {src, dest, series, watch} = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    serve = require('browser-sync').create(),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass')
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

function clear() {
  return del('dist');
};

function css() {
  return src('src/scss/styles.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions']
    }))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/css'));
};

function html() {
  return src('src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('dist'));
};

function js() {
  return src([
    'src/js/*.js'
  ])
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('dist/js'));
};

function copy() {
  return src(['src/images/*.*', 'src/fonts/*.*'], {base: "src"})
    .pipe(dest('dist'));   
};

function dev() {
  serve.init({
    server: './dist'
  });

  watch('src/images/*.*', series(copy)).on('change', serve.reload);
  watch('src/*.html', series(html)).on('change', serve.reload);
  watch('src/js/*.js', series(js)).on('change', serve.reload);
  watch('src/scss/*.scss', series(css)).on('change', serve.reload);
};

exports.build = series(clear, js, copy, css, html);
exports.dev = series(clear, js, copy, css, html, dev);
exports.clear = clear;
