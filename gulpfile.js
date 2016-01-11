var browserify = require('browserify');
var watchify = require('watchify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var crx = require('gulp-crx');
var manifest = require('./extension/manifest.json');
var fs = require('fs');
var pathmodify = require('pathmodify');
var path = require('path');
var assign = require('lodash.assign');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-cssnano');
var zip = require('gulp-zip');

var scripts = [
  'stackoverflow',
  'background',
  'buttons',
  'options',
  'github',
  'npmjs',
  'popup'
];

var vendorsContentScript = [
  'jquery',
  'lodash',
  'inherit',
  'sprintf-js',
  'uuid',
  'q'
];

var vendors = [
  'angular'
];

var options = {
  mods: [
    pathmodify.mod.dir('common', path.join(__dirname, './src/js/common')),
    pathmodify.mod.dir('background', path.join(__dirname, './src/js/background')),
    pathmodify.mod.dir('buttons', path.join(__dirname, './src/js/buttons')),
    pathmodify.mod.dir('popup', path.join(__dirname, './src/js/popup')),
    pathmodify.mod.dir('options', path.join(__dirname, './src/js/options'))
  ]
};

scripts.forEach(function(script) {
  gulp.task('browserify:' + script, function() {
    var browserifyBuilder = browserify('./src/js/' + script + '/init.js');
    vendors.concat(vendorsContentScript).forEach(function(lib) {
      browserifyBuilder.exclude(lib);
    });
    return browserifyBuilder
      .plugin(pathmodify, options)
      .bundle()
      .pipe(source(script + '.js'))
      .pipe(gulp.dest('./extension/compile/js/'));
  });
});

gulp.task('browserify:vendors', function() {
  var b = browserify();
  vendors.forEach(function(lib) {
    b.require(lib);
  });
  return b
    .bundle()
    .pipe(source('vendors.js'))
    .pipe(gulp.dest('./extension/compile/js/'));
});

gulp.task('browserify:vendors-content-script', function() {
  var b = browserify();
  vendorsContentScript.forEach(function(lib) {
    b.require(lib);
  });
  return b
    .bundle()
    .pipe(source('vendors_content_script.js'))
    .pipe(gulp.dest('./extension/compile/js/'));
});

gulp.task('browserify', function() {
  scripts.forEach(function(script) {
    gulp.start('browserify:' + script);
  });
  gulp.start('browserify:vendors');
  gulp.start('browserify:vendors-content-script');
});

gulp.task('concat:css', function() {
  return gulp.src(['./src/css/fonts.css', './src/css/bootstrap.css'])
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest('./extension/compile/css/'));
});

gulp.task('concat:css-highlight', function() {
  return gulp.src(['./node_modules/highlight.js/styles/default.css'])
    .pipe(concat('highlight.css'))
    .pipe(gulp.dest('./extension/compile/css/'));
});

gulp.task('watch', function() {
  scripts.forEach(function(script) {
    var customOpts = {
      entries: ['./src/js/' + script + '/init.js'],
      debug: false
    };
    var opts = assign({}, watchify.args, customOpts),
      browserifyBuilder = browserify(opts);
    vendors.concat(vendorsContentScript).forEach(function(lib) {
      browserifyBuilder.exclude(lib);
    });
    var watch = watchify(browserifyBuilder)
      .plugin(pathmodify, options);
    var bundle = function() {
      watch
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(script + '.js'))
        .pipe(gulp.dest('./extension/compile/js/'));
    };
    watch.on('update', bundle); // on any dep update, runs the bundler
    watch.on('log', gutil.log); // output build logs to terminal
    bundle();
  });
  gulp.start('browserify:vendors');
  gulp.start('browserify:vendors-content-script');
  gulp.start('concat:css');
  gulp.start('concat:css-highlight');

  gulp.watch('src/scss/**/*.scss', ['scss']);
});

gulp.task('scss', function () {
  gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('extension/compile/css'));
});

gulp.task('uglify-js', function() {
  return gulp.src('extension/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('extension'));
});

gulp.task('minify-css', function() {
  return gulp.src('extension/**/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('extension'));
});

gulp.task('compress', function () {
  return gulp.src('extension/**/*')
    .pipe(zip(manifest.name + '-v' + manifest.version + '.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('crx', function() {
  return gulp.src('extension/**/*')
    .pipe(crx({
      privateKey: fs.readFileSync('certificates/extension.pem', 'utf8'),
      filename: manifest.name + '-v' + manifest.version + '.crx'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  gulp.start('scss', 'watch');
});