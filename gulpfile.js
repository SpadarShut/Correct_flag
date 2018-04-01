var gulp = require('gulp');
var less = require('gulp-less');
var del = require('del');
const zip = require('gulp-zip');
var gulpSequence = require('gulp-sequence');


//gulp.task('less', function () {
//  return gulp.src('./less/**/*.less')
//      .pipe(less({
//        paths: [ path.join(__dirname, 'less', 'includes') ]
//      }))
//      .pipe(gulp.dest('./public/css'));
//});
gulp.task('build', gulpSequence('clean', 'copy', 'zip'));

gulp.task('clean', function(cb) {
  return del('build/codez**');
});

gulp.task('copy', function(cb) {
  return gulp.src([ 'source/**' ]).pipe(gulp.dest('build/codez/'))
});

gulp.task('zip', function(cb) {
    return gulp.src('build/codez/**')
          .pipe(zip('correct-flag.zip'))
          .pipe(gulp.dest('build'))
});

gulp.task('watch', function(){
  gulp.watch('source/**', ['copy']);
  // Other watchers
});


