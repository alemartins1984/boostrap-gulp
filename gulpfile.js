var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

var sassFiles = 'src/scss/**/*.scss',  
    cssFiles = 'src/css/',
    cssWebFiles = 'web/dist/css/';

var Script ='script.js',
    jsWebFiles = 'web/dist/js';

gulp.task('browser-sync', function() {
  browserSync({
  files: './app/index.html',
  port: 8082
  });
});

gulp.task('index', function () {
  var target = gulp.src('./src/index.html'); 
  var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});
  return target.pipe(inject(sources))
  .pipe(gulp.dest('./src'));
});
    
gulp.task('sass', function(){
  return gulp.src(sassFiles)
  .pipe(sass())
  .pipe(autoprefix({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest(cssFiles))
  .pipe(minifyCSS())
  .pipe(gulp.dest(cssWebFiles))
  .pipe(browserSync.stream());
});

gulp.task('js', function() {
  gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'src/js/**/*.js'
  ])
  .pipe(uglify())
  .pipe(concat(Script))
  .pipe(gulp.dest(jsWebFiles));
});

gulp.task('images', function() {
  gulp.src([
    'src/images/**/*'
  ])
  .pipe(gulp.dest('web/dist/images'));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['index', 'sass', 'js', 'images', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['sass', 'bs-reload']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

