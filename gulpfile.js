var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    sass        = require('gulp-sass'),
    autoprefix  = require('gulp-autoprefixer'),
    inject      = require('gulp-inject'),
    concat      = require('gulp-concat'),
    //clean       = require('gulp-clean'),
    rename      = require('gulp-rename'),
    minifyCSS   = require('gulp-minify-css'),
    uglify      = require('gulp-uglify'),
    imagemin    = require("gulp-imagemin");


gulp.task('browser-sync', function() {
  browserSync({
  files: './app/index.html',
  port: 8082
  });
});

gulp.task('index', function () {
  var target = gulp.src('./app/index.html'); 
  var sources = gulp.src(['./app/js/script.js', './app/css/main.css'], {read: false});
  return target.pipe(inject(sources))
  .pipe(gulp.dest('./app'));
});

/*
gulp.task('clean', function() {
  return gulp.src(bases.dist)
  .pipe(clean());
});
*/
gulp.task('sass', function(){
  return gulp.src('./app/scss/**/*.scss')
  .pipe(sass())
  .pipe(browserSync.stream())
  .pipe(gulp.dest('./app/css/'));
});

gulp.task('css', function(){
  return gulp.src('./app/css/main.css')
  .pipe(autoprefix({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(minifyCSS())
  .pipe(rename({extname:'.min.css'}))
  .pipe(gulp.dest('./app/css'));
});

gulp.task('js', function() {
  gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'app/js/**/*.js'
  ])
  .pipe(uglify())
  .pipe(concat('all.js'))
  .pipe(rename({extname:'.min.js'}))
  .pipe(gulp.dest('app/js'));
});

gulp.task('images', function() {
  gulp.src(['app/images/**/*'])
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}]
  }))
  .pipe(gulp.dest('app/images'));
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['index', 'sass', 'css', 'js', 'images', 'browser-sync'], function () {
  gulp.watch("app/scss/**/*.scss", ['sass', 'bs-reload']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

