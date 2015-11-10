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

var scripts = [
  'stackoverflow',
  'background',
  'buttons',
  'options'
];

var vendorsContentScript = [
  'jquery',
  'lodash',
  'inherit',
  'sprintf-js',
  'uuid'
];

var vendors = [
  'angular',
  'url',
  'lodash'
];

var options = {
  mods: [
    pathmodify.mod.dir('common', path.join(__dirname, './src/js/common')),
    pathmodify.mod.dir('stackoverflow', path.join(__dirname, './src/js/stackoverflow')),
    pathmodify.mod.dir('background', path.join(__dirname, './src/js/background')),
    pathmodify.mod.dir('buttons', path.join(__dirname, './src/js/buttons')),
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
      .plugin(pathmodify(), assign({}, options))
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
  return gulp.src(['./node_modules/angular-material/angular-material.css'])
    .pipe(concat('vendors.css'))
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
    var watch = watchify(browserifyBuilder);
    function bundle() {
      watch
        .plugin(pathmodify(), assign({}, options))
        .bundle()
        .pipe(source(script + '.js'))
        .pipe(gulp.dest('./extension/compile/js/'));
    }
    watch.on('update', bundle); // on any dep update, runs the bundler
    watch.on('log', gutil.log); // output build logs to terminal
    bundle();
  });
  gulp.start('browserify:vendors');
  gulp.start('browserify:vendors-content-script');
  gulp.start('concat:css');

  gulp.watch('src/sass/**/*.sass', ['sass']);
});

gulp.task('sass', function () {
  gulp.src('src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('extension/compile/css'));
});

gulp.task('crx', ['browserify', 'sass'] , function() {
  return gulp.src('extension/')
    .pipe(crx({
      privateKey: fs.readFileSync('certificates/extension.pem', 'utf8'),
      filename: manifest.name + '-v' + manifest.version + '.crx'
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', function() {
  gulp.start('sass', 'watch');
});