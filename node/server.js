var simpleserver = require("./simpleserver");
var router = require("./router");
var requesthandlers = require("./requesthandlers");

var handle = {};
handle["/"] = requesthandlers.start;
handle["/start"] = requesthandlers.start;
handle["/upload"] = requesthandlers.upload;
handle["/show"] = requesthandlers.show;

simpleserver.start(router.route, handle);
