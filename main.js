var express = require('express'); 
var app = express();		  
var fs = require('fs');		  
var https = require('https'); // https now	  
var ip = require("ip");

var privateKey = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('certificate.pem', 'utf8');

var cred = {key: privateKey, cert: certificate};

const rootDir='/tmp/releases/';    

function getNewest() { // returns newest file path in /tmp/releases
	
	var files = fs.readdirSync(rootDir); 

	files.sort(function(a, b) { // sorting algorithm
               return fs.statSync(rootDir + a).mtime.getTime() - 
                      fs.statSync(rootDir + b).mtime.getTime();
	});

	var newest = files[files.length-1];
	return (rootDir+newest);
}

app.get('/process', function (req, res) { // if we get http://.../process
	var content;
	var files;

	fs.readFile(getNewest(), function read(err, data) {
    		if (err) {
        		throw err;
    		}
  		content = data; // data contains content of sampleN.bin from rootDir
   		console.log(content);
    		res.writeHead(200, {'Content-Type': 'application/binary'});
    		res.end(content, 'binary'); // write the content in binary
	});
});

var httpsServer = https.createServer(cred, app);
httpsServer.listen(8033, ip.address());
//httpsServer.listen(8033, '10.20.16.152');
alert('App is listening at https://' + ip.address() + ':8033');
//console.log('Listening at https://' + '10.20.16.152' + ':8033');
