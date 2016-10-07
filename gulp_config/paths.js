'use strict';

function getPaths(config) {
	var path = require('path');

	var dirs = {
		"dest": "source/public",
		"css": "styles",
		"root": ".",
		"sass": "sass",
		"src": "source/_public",
		"tasks": "gulp_tasks"
	};

	var base = {
		dest: path.join(dirs.root, dirs.dest),
		src: path.join(dirs.root, dirs.src)
	};

	var paths = {
		"clean": [base.dest],
		"dest": {
			"root": base.dest,
			"css": path.join(base.dest, dirs.css)
		},
		"src": {
			"root": base.src,
			"sass": path.join(base.src, dirs.sass)
		},
		"tasks": path.join(dirs.root, dirs.tasks)
	};

	return paths;
}

module.exports = getPaths;
