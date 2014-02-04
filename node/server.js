var simpleserver = require("./simpleserver");
var router = require("./router");
var requesthandlers = require("./requesthandlers");

var handle = {};
handle["/"] = requesthandlers.start;
handle["/start"] = requesthandlers.start;
handle["/upload"] = requesthandlers.upload;
handle["/show"] = requesthandlers.show;
handle["/store"] = requesthandlers.store;

simpleserver.start(router.route, handle);
