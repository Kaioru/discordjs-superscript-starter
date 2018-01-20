var ssparser = require('ss-parser');
var sfacts = require('sfacts');
var glob = require('glob');
var fs = require('fs');

require('dotenv').config()

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/parser';

module.exports = function (gulp, options, plugins) {
    gulp.task('parse:data', function (callback) {
        glob(`${__dirname}/../app/facts/**/*.{top,tb}`, (err, files) => {
            var process = sfacts.default.load(MONGODB_URI, files, true, (err, factSystem) => {
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

    gulp.task('build:js', function () {
        gulp.src('app/**/*.js')
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.babel({
                presets: ['env']
            }))
            .pipe(plugins.uglify())
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('dist'))
    });

    gulp.task('build', ['build:js', 'parse:data', 'parse:facts']);
}