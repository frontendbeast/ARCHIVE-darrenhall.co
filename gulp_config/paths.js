'use strict';

function getPaths(config) {
	var path = require('path');

	var dirs = {
		"dest": "public",
		"css": "styles",
		"partials": "partials",
		"root": "./source",
		"sass": "sass",
		"src": "_public",
		"tasks": "gulp_tasks",
		"views": "views"
	};

	var base = {
		dest: path.join(dirs.root, dirs.dest),
		src: path.join(dirs.root, dirs.src)
	};

	var paths = {
		"clean": [base.dest],
		"dest": {
			"partials": path.join(dirs.root, dirs.views, dirs.partials, 'inline'),
			"root": base.dest,
			"css": path.join(base.dest, dirs.css)
		},
		"src": {
			"partials": path.join(base.src, dirs.partials),
			"root": base.src,
			"sass": path.join(base.src, dirs.sass)
		},
		"tasks": path.join(dirs.tasks)
	};

	return paths;
}

module.exports = getPaths;
