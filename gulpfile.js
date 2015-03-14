'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var connect = require('gulp-connect');
var ghPages = require('gulp-gh-pages');
var less = require('gulp-less');
var path = require('path');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var getBundleName = function () {
  var version = require('./package.json').version;
  var name = require('./package.json').name;
  return version + '.' + name + '.' + 'min';
};

gulp.task('connect', function () {
  connect.server();
});

gulp.task('lint', function() {
  return gulp.src('./components/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('less', function () {
  return gulp.src('./components/**/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('javascript', function () {
  // transform regular node stream to gulp (buffered vinyl) stream 
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src('./components/app.js')
    .pipe(browserified)
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        //.pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function () {
  gulp.watch(['**/*.js', '**/*.json', '**/*.less'], ['lint', 'javascript', 'less']);
});

gulp.task('deploy', ['javascript'], function () {
  return gulp.src(['./index.html', './dist/**/*'])
      .pipe(ghPages({
        force: true
      }));
});

gulp.task('dev', ['lint', 'javascript', 'less', 'connect', 'watch']);
gulp.task('default', ['lint', 'javascript', 'less']);