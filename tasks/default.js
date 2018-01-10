module.exports = function (gulp, options, plugins) {
    gulp.task('watch', function () {
        plugins.watch('app/**/*', function () {
            gulp.start('build');
        });
    });

    gulp.task('default', ['build']);
}