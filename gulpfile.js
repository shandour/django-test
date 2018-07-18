// requirements
var gulp = require('gulp');
var gulpBrowser = require("gulp-browser");
var reactify = require('babelify');
var del = require('del');
var size = require('gulp-size');


// tasks

gulp.task('transform', function () {
  var stream = gulp.src('./notes/static/notes/jsx/reactFrontend.js')
    .pipe(gulpBrowser.browserify({transform: ['babelify', {presets: ["es2015", "react"]}]}))
    .pipe(gulp.dest('./notes/static/notes/js/'))
    .pipe(size());
  return stream;
});

gulp.task('del', function () {
  return del(['./notes/static/notes/js']);
});

gulp.task('default', ['del'], function () {
  gulp.start('transform');
});


 
