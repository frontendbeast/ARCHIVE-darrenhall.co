/* jshint node: true */
'use strict';

function getTaskConfig(config) {
	var path = require('path');

	var taskConfig = {
		items: [path.join(config.paths.src.root, 'favicon.ico')]
	};

	return taskConfig;
}

module.exports = getTaskConfig;
