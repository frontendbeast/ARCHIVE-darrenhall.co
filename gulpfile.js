'use strict';

/* ============================================================ *\
	PLUGINS
\* ============================================================ */

var argv            = require('yargs').argv;
var del             = require('del');
var fs              = require('fs');
var gulp            = require('gulp');
var path            = require('path');
var runSequence     = require('run-sequence');


/* ============================================================ *\
	CONFIG
\* ============================================================ */

var config          = {};

config.paths        = require('./gulp_config/paths.js')(config);

config.task         = {};

config.isProd       = argv.prod || false;
config.isWatched    = argv.watch || false;


/* ============================================================ *\
	TASKS
\* ============================================================ */

var tasks           = {};

tasks.default       = [];
tasks.watch         = [];

// Load all tasks from _task folder
fs.readdirSync(config.paths.tasks).filter(function(file) {
	var filePath = path.join(config.paths.tasks, file);

    if (fs.statSync(filePath).isFile() && path.extname(file) === ".js") {
		require(path.resolve(filePath))(gulp, config, tasks);
	}
});

gulp.task('clean', function () {
	return del(config.paths.clean);
});

/* ============================================================ *\
	MAIN TASKS
\* ============================================================ */

var tasksDefault = (config.isWatched) ? tasks.default.concat(tasks.watch) : tasks.default;

gulp.task('watch', tasks.watch);
gulp.task('default', function(cb) {
	runSequence(['clean'], tasksDefault, cb);
});
