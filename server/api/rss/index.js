//http://feeds.bbci.co.uk/news/video_and_audio/politics/rss.xml
'use strict';

var express = require('express');
var request = require('request');
//var parseString = require('xml2js').parseString;
var router = express.Router();

router.get('/', function (req, res) {
	request('http://feeds.bbci.co.uk/news/politics/rss.xml', function (error, response, body) {
		if (!error && response.statusCode === 200) {
//			parseString(body, function (err, result) {
//				res.jsonp(result);
//			});
			res.send(body);
		}
	});
});

module.exports = router;
