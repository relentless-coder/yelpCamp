var gulp = require('gulp');

var beautify = require('gulp-beautify');

var jshint = require('gulp-jshint');

gulp.task('jshint', function() {
  return gulp.src('app.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
})

gulp.task('beautify', function() {
  return gulp.src('app.js')
  .pipe(beautify({indent_size: 2}))
  .pipe(gulp.dest("build/"));
});

gulp.task('lint', ['jshint']);