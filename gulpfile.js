var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var del = require('del');
const zip = require('gulp-zip');


//gulp.task('less', function () {
//  return gulp.src('./less/**/*.less')
//      .pipe(less({
//        paths: [ path.join(__dirname, 'less', 'includes') ]
//      }))
//      .pipe(gulp.dest('./public/css'));
//});
gulp.task('build', ['copy', 'zip']);

gulp.task('copy', function() {
  return del('build/*').then(
      function () {
        return gulp.src([ 'source/**' ])
            .pipe(gulp.dest('build/codez/'))
      }
  )
});

gulp.task('zip', function() {

    return gulp.src('build/codez/**')
          .pipe(zip('correct-flag.zip'))
          .pipe(gulp.dest('build'))
});

gulp.task('watch', function(){
  gulp.watch('source/**', ['copy']);
  // Other watchers
})


