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

var scripts = [
  'stackoverflow',
  'background',
  'buttons',
  'options'
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
    return browserify('./src/js/' + script + '/init.js')
      .plugin(pathmodify(), assign({}, options))
      .bundle()
      .pipe(source(script + '.js'))
      .pipe(gulp.dest('./extension/compile/js/'));
  });
});

gulp.task('browserify', function() {
  scripts.forEach(function(script) {
    gulp.start('browserify:' + script);
  });
});

gulp.task('watch', function() {
  scripts.forEach(function(script) {
    var customOpts = {
      entries: ['./src/js/' + script + '/init.js'],
      debug: false
    };
    var opts = assign({}, watchify.args, customOpts),
      watch = watchify(browserify(opts));
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
});

gulp.task('crx', ['browserify'] , function() {
  return gulp.src('extension/')
    .pipe(crx({
      privateKey: fs.readFileSync('certificates/extension.pem', 'utf8'),
      filename: manifest.name + '-v' + manifest.version + '.crx'
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', function() {
  gulp.start('watch');
});