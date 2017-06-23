var express = require('express'); // Creates a variable that contains 'express' functions
var app = express();		  // Set variable 'app' to express constructor
var fs = require('fs');		  // Create a file system object, lets you call file system functions
var http = require('http');	  // Create http object, lets you call http functions
app.use(express.static('public'));// Allows you to load files from the 'public' directory


app.get('/index.html', function (req, res) { 
	   res.sendFile( __dirname + "/" + "index.html" ); // if we get http://127.0.0.1:8033/index.html, load index.html

})

app.get('/process_get', function (req, res) {		   // if we get http://127.0.0.1:8033/process_get (from html submit)	
	var file = fs.createWriteStream("sample.txt");
	http.get("http://127.0.0.1:8033/new/sample.txt", function(response) {response.pipe(file);}); 

})
	
var server = app.listen(8033, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
	
})
