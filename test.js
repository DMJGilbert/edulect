//UPYGCONS
var https = require('https');
var fs = require('fs');

var host = process.argv[2] || "http-api.openbloomberg.com";
var port = 443

var options = {
	host: host,
	port: port,
	path: '/request?ns=blp&service=refdata&type=ReferenceDataRequest',
	method: 'POST',
	key: fs.readFileSync('./keys/client.key'),
	cert: fs.readFileSync('./keys/client.crt'),
	ca: fs.readFileSync('./keys/bloomberg.crt')
};

var req = https.request(options, function (res) {
	console.log("statusCode: ", res.statusCode);
	console.log("headers: ", res.headers);

	res.on('data', function (d) {
		process.stdout.write(d);
	});
});

req.write(JSON.stringify({
	"securities": ["UPYGCONS index", "UPYGOTHR index", "UPYGLAB index", "UPYGUKIP index", "UPYGGREE index", "UPYGLIB index"],
	"fields": ["NAME", "PX_LAST"]
}));
req.end();

req.on('error', function (e) {
	console.error(e);
});
