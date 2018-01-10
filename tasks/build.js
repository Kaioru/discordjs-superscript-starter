var ssparser = require('ss-parser');
var fs = require('fs');

module.exports = function (gulp, options, plugins) {
    gulp.task('parse:data', function (callback) {
        ssparser.default.parseDirectory(
            'app/responses',
            {},
            function (error, data) {
                fs.writeFile('./dist/data.json', JSON.stringify(data), callback);
            }
        );
    });

    gulp.task('build:babel', function () {
        gulp.src('app/**/*.js')
            .pipe(plugins.babel({
                presets: ['env']
            }))
            .pipe(gulp.dest('dist'))
    });

    gulp.task('build', ['build:babel', 'parse:data']);
}