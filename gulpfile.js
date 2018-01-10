var gulp = require('gulp');

require('load-gulp-tasks')(gulp, {
    pattern: ['tasks/**/*.js']
});

gulp.task('default', ['build']);