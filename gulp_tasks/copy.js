/*jslint node: true */
'use strict';

/* ============================================================ *\
	COPY
\* ============================================================ */

module.exports = function(gulp, config, tasks) {

	config.task.copy 	= require('../gulp_config/task.copy.js')(config);

	gulp.task('copy', function () {
		return gulp.src(config.task.copy.items, { base: config.paths.src.root })
			.pipe(gulp.dest(config.paths.dest.root));
	});

	tasks.default.push('copy');

};
