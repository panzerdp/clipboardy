var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var pathmodify = require('pathmodify');
var crx = require('gulp-crx');
var manifest = require('./extension/manifest.json');
var fs = require('fs');

gulp.task('browserify:stackoverflow', function() {
  return browserify('./src/js/stackoverflow/init.js')
    .bundle()
    .pipe(source('stackoverflow.js'))
    .pipe(gulp.dest('./extension/compile/js/'));
});

gulp.task('browserify:background', function() {
  return browserify('./src/js/background/init.js')
    .bundle()
    .pipe(source('background.js'))
    .pipe(gulp.dest('./extension/compile/js/'));
});

gulp.task('browserify', function() {
  gulp.start('browserify:stackoverflow');
  gulp.start('browserify:background');
});

gulp.task('watch', function() {
  gulp.watch('src/js/stackoverflow/**/*', ['browserify:stackoverflow']);
  gulp.watch('src/js/background/**/*', ['browserify:background']);
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
  gulp.start('browserify', 'watch');
});