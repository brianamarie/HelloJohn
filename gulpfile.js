
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    minifycss = require('gulp-minify-css'),
    //connect = require('gulp-connect');
    nodemon = require('gulp-nodemon')

// SASS
gulp.task('css', function() {
  return gulp.src('views/css/*.scss')
    .pipe(sass({ style: 'compressed' }))
    .pipe(gulp.dest('public/css'))
    .pipe(minifycss())
    .pipe(gulp.dest('public/css'))
});

// JADE
gulp.task('jade', function() {

  return gulp.src('views/*.jade')
    //.pipe(jade({
    //  pretty: true
    //}))
    .pipe(gulp.dest('public'))
});

// JAVASCR©IPT
gulp.task('js', function() {
  return gulp.src('views/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

// EXPRESS
/*
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});
*/
gulp.task('develop', function() {
    nodemon({
        script: 'app.js',
        ext: 'html,js,css',
        env: { PORT: '8080 '}
    })
    .on('restart', function() {
        console.log('restarted')
    })
})

// WATCH
gulp.task('watch', function() {
  gulp.watch('views/css/*.scss', ['css']);
  gulp.watch('views/js/*.js', ['js'])
  gulp.watch('views/*.jade', ['jade']);
});

gulp.task('default', ['js', 'css', 'jade', 'develop', 'watch']);
