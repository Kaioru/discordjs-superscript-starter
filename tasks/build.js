var ssparser = require('ss-parser');
var sfacts = require('sfacts');
var glob = require('glob');
var fs = require('fs');

module.exports = function (gulp, options, plugins) {
    gulp.task('parse:data', function (callback) {
        glob(`${__dirname}/../app/facts/**/*.{top,tb}`, (err, files) => {
            var process = sfacts.default.load('mongodb://localhost:27017/superscriptParser', files, true, (err, factSystem) => {
                ssparser.default.parseDirectory(
                    'app/responses',
                    { factSystem },
                    function (error, data) {
                        fs.writeFile('./dist/data.json', JSON.stringify(data), function (err) {
                            factSystem.level.close();
                            callback();
                        });
                    }
                );
            });
        });
    });

    gulp.task('parse:facts', function () {
        gulp.src('app/**/*.{top,tbl}')
            .pipe(gulp.dest('dist'))
    });

    gulp.task('build:babel', function () {
        gulp.src('app/**/*.js')
            .pipe(plugins.babel({
                presets: ['env']
            }))
            .pipe(gulp.dest('dist'))
    });

    gulp.task('build', ['build:babel', 'parse:data', 'parse:facts']);
}