'use strict';

function getTaskConfig(config) {
	var path = require('path');

	var taskConfig = {
		inlineSource: {
			rootpath: path.resolve(config.paths.dest.root)
		}
	};

	return taskConfig;
}

module.exports = getTaskConfig;
