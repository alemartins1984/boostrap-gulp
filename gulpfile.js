var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

var sassFiles = 'app/scss/**/*.scss',  
    cssFiles = 'app/css/';

gulp.task('browser-sync', function() {
  browserSync({
  files: './app/index.html',

  port: 8082

  });
});
    
gulp.task('sass', function(){
  return gulp.src(sassFiles)
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest(cssFiles))
    .pipe(browserSync.stream());
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['sass', 'browser-sync'], function () {

    gulp.watch("app/scss/**/*.scss", ['sass', 'bs-reload']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

