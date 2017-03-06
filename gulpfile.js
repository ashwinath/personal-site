var gulp      = require('gulp'),
    less      = require('gulp-less'),
    watchLess = require('gulp-watch-less');

gulp.task('less', () => {
  gulp.src('less/main.less')
      .pipe(less())
      .pipe(gulp.dest('public/css'))
});

gulp.task('watchless', () => {
  return gulp.src('less/main.less')
             .pipe(watchLess('less/main.less'))
             .pipe(less())
             .pipe(gulp.dest('public/css'))
});
