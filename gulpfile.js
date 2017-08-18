var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify');

var bases = {
 src: 'src/',
 dist: 'web/dist/',
};

gulp.task('browser-sync', function() {
  browserSync({
  files: './src/index.html',
  port: 8082
  });
});

gulp.task('index', function () {
  var target = gulp.src('./src/index.html'); 
  var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});
  return target.pipe(inject(sources))
  .pipe(gulp.dest('./src'));
});

gulp.task('clean', function() {
  return gulp.src(bases.dist)
  .pipe(clean());
});

gulp.task('sass', function(){
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sass())
  .pipe(browserSync.stream())
  .pipe(gulp.dest('./src/css/'));
});

gulp.task('css', function(){
  return gulp.src('./src/css/main.css')
  .pipe(autoprefix({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(rename({extname:'.min.css'}))
  .pipe(gulp.dest('./web/dist/css'));
});

gulp.task('js', function() {
  gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'src/js/**/*.js'
  ])
  .pipe(uglify())
  .pipe(concat('all.js'))
  .pipe(rename({extname:'.min.js'}))
  .pipe(gulp.dest('web/dist/js'));
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

gulp.task('default', ['clean', 'index', 'sass', 'css', 'js', 'images', 'browser-sync'], function () {
  gulp.watch("src/scss/**/*.scss", ['sass', 'bs-reload']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

