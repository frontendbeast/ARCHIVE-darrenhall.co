'use strict';

/* ============================================================ *\
	INLINE HANDLEBARS
\* ============================================================ */

var fs              = require('fs');
var gulpif          = require('gulp-if');
var path            = require('path');

var inlineSource = require('gulp-inline-source');

module.exports = function(gulp, config, tasks) {

	config.task.inline = require('../gulp_config/task.inline.js')(config);

	var dependencies = (config.isProd) ? ['sass'] : [];

	gulp.task('inline', dependencies, function () {
		gulp.src([path.join(config.paths.src.partials, '/**/*.hbs')])
			.pipe(gulpif(config.isProd, inlineSource(config.task.inline.inlineSource)))
			.pipe(gulp.dest(config.paths.dest.partials));
	});

	tasks.default.push('inline');

};
