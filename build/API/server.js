var http = require('http');

var server = http.createServer(function(req, res) {


	res.writeHead(200);

	var resultText = "Hello world";

	console.log(req);

	if(req.url == "/api/endpoint") {
		resultText = "end point 123 123";
		
	}

	res.end(resultText);

});

server.listen(8080);