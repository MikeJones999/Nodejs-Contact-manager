//-----------packages----------

//http module for web service
var http = require('http');
// I/O module
var fs = require('fs');

//utilities for URL resolution and parsing
var url = require('url');

//----------Variables---------

var port = 8081;



//--------Create server---------

http.createServer( (request, response) =>
{
//	parse the request containing file name
	var path = url.parse(request.url).pathname;
	
//	Print to console name of the file for which request made
	console.log("request for " + path + "received");
	
//	read the requested file content from file systemLanguage
	fs.readFile(path.substr(1), (err, data) =>
	{
		if(err)
		{
			console.log("***DEBUG*** " + err);
			response.writeHead(404, {'Content-Type' : 'text/html'});
		}	
		else
		{
			//page found - status ok 200
			//content - type : text/plain
			response.writehead(200, {'Content-Type': 'text/html'});
			response.write(data.toString());
		}			
	});
	
}).listen(port);

console.log("Server running at http://127.0.0.1:" + port + '/');


