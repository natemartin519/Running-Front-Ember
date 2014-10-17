var gulp         = require('gulp'),
    bower        = require('gulp-bower'),
    plugins      = require('gulp-load-plugins')();


gulp.task('webserver', function() {
    gulp.src(['app'])
        .pipe(plugins.webserver({
            port: 3000,
            livereload: true,
            fallback: 'index.html'
        }));
});


gulp.task('sass', function() {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(plugins.rubySass({
            style: 'compressed',
            loadPath: [
                './source/scss/',
                './bower_components/bootstrap-sass-official/assets/stylesheets'
            ]
        })
            .on("error", plugins.notify.onError(function(error) {
                return "Error: " + error.message;
            })))
        .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('html', function() {
    return gulp.src('./source/*.html')
        .pipe(gulp.dest('./app'));
});

gulp.task('concat', function() {
    return gulp.src('./source/js/**/*.js')
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('./app/assets/js'));
});

gulp.task('minify', function() {
    return gulp.src('./source/js/**/*.js')
        .pipe(plugins.concat('app.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./app/assets/js'));
});

gulp.task('clean', function(){
    // return gulp.src('', { read: false })
    //     .pipe(plugins.clean());
});


gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('./bower_components'));
});


gulp.task('build',['html', 'sass', 'concat']);
// gulp.task('deploy', ['clean', 'html', 'sass', 'minify']);
gulp.task('default', ['build']);

gulp.task('watch', ['build', 'webserver'], function() {
    gulp.watch('./source/scss/**', ['sass']);
    gulp.watch('./source/js/**', ['concat']);
    gulp.watch('./source/*.html', ['html']);
});