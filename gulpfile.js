var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var pathmodify = require('pathmodify');
var path = require('path');

var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var crx = require('gulp-crx');
var manifest = require('./extension/manifest.json');
var fs = require('fs');

//gulp.task('browserify:background', function() {
//  gulp.src('src/js/background/init.js')
//    .pipe(rename('background.js'))
//    .pipe(browserify({
//      debug : true
//    }))
//    .pipe(gulp.dest('./extension/compile/js'));
//});

gulp.task('browserify:stackoverflow', function() {
  gulp.src('src/js/stackoverflow/init.js')
    .pipe(rename('stackoverflow.js'))
    .pipe(browserify({
      debug : true
    }))
    .pipe(gulp.dest('./extension/compile/js'))
});

gulp.task('browserify', function() {
  gulp.start('browserify:stackoverflow');
});

gulp.task('sass', function () {
  gulp.src('src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('extension/compile/css'));
});

gulp.task('watch', function() {
  gulp.watch('src/js/stackoverflow/**/*', ['browserify:stackoverflow']);
  //gulp.watch('src/js/gmail/**/*', ['browserify:gmail']);
  //gulp.watch('src/sass/*.sass', ['sass']);
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
  gulp.start('browserify', 'watch');
});