'use strict';

/* ============================================================ *\
	HBS
\* ============================================================ */

var fs              = require('fs');
var livereload      = require('gulp-livereload');
var path            = require('path');

module.exports = function(gulp, config, tasks) {

	gulp.task('watch:hbs', function () {
		gulp.watch([path.join(config.paths.src.views, '/**/*.hbs')], function(file) {
        	livereload.changed(file.path);
		});
	});

	tasks.watch.push('watch:hbs');

};
