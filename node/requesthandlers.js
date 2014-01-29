var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response, request) {

	console.log("Request handler 'start' was called.");
	var body = '<html>'+
	'<head>'+
	'<meta http-equiv="Content-Type" content="text/html; '+
	'charset=UTF-8" />'+
	'</head>'+
	'<body>'+
	'<form action="/upload" enctype="multipart/form-data" method="post">'+
	'<input type="file" name="upload" multiple="multiple">' +
	'<input type="submit" value="Upload file" />' +
	'</form>'+
	'</body>'+
	'</html>';

	response.writeHead(200, {"Content-Type" : "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request){
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		fs.rename(files.upload.path, "./media/test.png", function(error) {
			if (error) {
				console.log("Error, unlinking");
				fs.unlink("./media/test.png");
				fs.rename(files.upload.path, "./media/test.png");
			}
		});
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("received image:<br/>");
	response.write("<img src='/show' />");
	response.end();
	});
}

function show(response, request){
	console.log("Request handler 'show' was called");
	response.writeHead(200, {"Content-Type" : "image/png"});
	fs.createReadStream("./media/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;