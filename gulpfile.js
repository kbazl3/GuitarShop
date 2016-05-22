var gulp = require('gulp'),
    concat = require('gulp-concat'),
    annotate = require('gulp-ng-annotate'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    path = require('path'),
    imagemin = require('gulp-imagemin');

var paths = {
 jsSource: ['./public/js/**/*.js', '!/public/bundle.js'],
 sassSource: ['./public/css/**/*.sass']
};

gulp.task('js', function() {
 return gulp.src(paths.jsSource)
 .pipe(plumber())
 .pipe(annotate())
 .pipe(uglify())
 .pipe(concat('bundle.js'))
 .pipe(gulp.dest('./public'));
});

//minify images
gulp.task('image', function() {
    gulp.src('./public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images2'));
});

gulp.task('sass', function () {
 return gulp.src(paths.sassSource)
   .pipe(sass({
     paths: [ path.join(__dirname, 'styles') ]
   }))
   .pipe(concat('style.css'))
   .pipe(gulp.dest('./public/styles'));
});

gulp.task('watch', function() {
 gulp.watch(paths.jsSource, ['js']);
 gulp.watch(paths.sassSource, ['sass']);
});

gulp.task('default', ['watch', 'js', 'sass']);
