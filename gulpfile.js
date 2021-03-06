'use strict';

var gulp = require('gulp'),
    assign = require('lodash').assign,
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    del = require('del'),
    gutil = require('gulp-util'),
    mochify = require('mochify'),
    runSequence = require('run-sequence'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    stringify = require('stringify'),
    watchify = require('watchify');

// add custom browserify options here
var customOpts = {
  entries: ['./src/js/index.js'],
  debug: true
};
var watchifyOpts = assign({}, watchify.args, customOpts);
var watchify = watchify(browserify(watchifyOpts).transform(stringify()));

gulp.task('js-watch', watchifyBundle); // so you can run `gulp js-watch` to
                                       // watch+build the file
watchify.on('update', watchifyBundle); // on any dep update, runs the bundler
watchify.on('log', gutil.log); // output build logs to terminal

function watchifyBundle() {
  return watchify.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // next line optional, remove if you don't need to buffer file contents
    .pipe(buffer())
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

gulp.task('js', function() {
  return browserify(customOpts)
    .transform(stringify())
    .bundle()
    // log errors if they happen
    // .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // need to buffer file contents so we can use sourcemaps and uglify
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
  return gulp.src('./src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function() {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function(cb) {
  return del(['./dist/'], cb);
});

gulp.task('build', function(callback) {
  runSequence('clean', ['html', 'js', 'sass'], callback);
});

/* Not currently used */
gulp.task('test', function() {
  return mochify('./test/**/*.js', {
    ui: 'tdd',
    reporter: 'dot'
  }).bundle();
  // gulp.src(['test/**/test-*.js'], { read: false })
    // .pipe(mocha({
      // ui: 'tdd',
      // reporter: 'dot'
    // }));
});
