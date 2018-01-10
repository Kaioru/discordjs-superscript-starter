var del = require('del');

module.exports = function (gulp, options, plugins) {
    gulp.task('watch', function () {
        plugins.watch('app/**/*', function () {
            gulp.start('clean');
            gulp.start('build');
        });
    });

    gulp.task('clean', function () {
        return del(['dist']);
    });

    gulp.task('default', ['clean'], function () {
        gulp.start('build');
    });
}