'use strict';

/* ============================================================ *\
	SASS / CSS
\* ============================================================ */

var fs              = require('fs');
var gulpif          = require('gulp-if');
var livereload      = require('gulp-livereload');
var path            = require('path');

var sass            = require('gulp-sass');

module.exports = function(gulp, config, tasks) {

	config.task.sass = require('../gulp_config/task.sass.js')(config);

	var dependencies = [];

	gulp.task('sass', dependencies, function () {
		return gulp.src([path.join(config.paths.src.sass, '/**/*.scss')])
			.pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}).on('error', sass.logError))
			.pipe(gulp.dest(config.paths.dest.css))
			.pipe(gulpif(config.isWatched, livereload()));
	});

	gulp.task('watch:sass', function () {
		gulp.watch([path.join(config.paths.src.sass, '/**/*.scss')], ['sass']);
	});

	tasks.default.push('sass');
	tasks.watch.push('watch:sass');

};
