var http = require("http");
var port = 8081;

http.createServer(function(request, response)
{
	
	//send the http header
	//http status: 200 : OK
	//Content Type: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});
	
	//send the response body as "Hello World"
	response.end('Hello World\n');
}).listen(port);

console.log('Server running at http://127.0.0.1:' + port + '/');




var fs = require("fs");

//------------blocking code-------------------------

//read the file ('input.txt')
var data = fs.readFileSync('input.txt');

//prin out the contents of the file read
console.log(data.toString());
console.log("blocking code - Program Complete");

//------------non blocking code--------------------

//fs.readFile('input.txt', function(err, data)

fs.readFile('input.txt', (err, data) =>
{
	if (err)
		return console.log("Error: " + err);
	else
		console.log(data.toString());
});
console.log("Non blocking code - Program Complete");