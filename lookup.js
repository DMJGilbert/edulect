// usage: node InstrumentLookupRequest.js [<host>]
var https = require('https');
var fs = require('fs');

var host =  "http-api.openbloomberg.com";
var port = 443

var options = {
	host: host,
	port: port,
	path: '/request?ns=blp&service=instruments&type=instrumentListRequest',
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
	"query": process.argv[2],
	"yellowKeyFilter": "YK_FILTER_INDX",
	"languageOverride": "LANG_OVERRIDE_NONE",
	"maxResults": 500
}));
req.end();

req.on('error', function (e) {
	console.error(e);
});
