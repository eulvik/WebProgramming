function route(handle, pathname) {
	if(typeof(handle[pathname]) === 'function') {
		handle[pathname]();
	} else {
		console.log("No request handler found for route: " + pathname);
	}
}

exports.route = route;