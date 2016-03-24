'use strict';

var gulp = require('gulp'),
    assign = require('lodash').assign,
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    mocha = require('gulp-mocha'),
    mochify = require('mochify'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    watchify = require('watchify');

// add custom browserify options here
var customOpts = {
  entries: ['./src/js/index.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // next line optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
     // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'));
}

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
