'use strict';

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: process.env.CKEY,
	consumer_secret: process.env.CSEC,
	access_token_key: process.env.AKEY,
	access_token_secret: process.env.ASEC
});

router.get('/', function (req, res) {
	if (req.query.id) {
		request("http://yournextmp.popit.mysociety.org/api/v0.1/search/persons?q=id:" + req.query.id + "&embed=membership.person.membership.organization", function (error, response, body) {
			if (!error && response.statusCode === 200) {
				var candidate = JSON.parse(body).result[0];
				console.log(candidate)
				request.post('http://enterprise.majesticseo.com/api/json', {
					form: {
						app_api_key: process.env.MAJESTICAPI,
						item: findLink(candidate.memberships[0].person_id.links),
						cmd: 'GetTopics'
					}
				}, function (error, response, body) {
					if (!error && response.statusCode === 200) {
						var web = JSON.parse(body);
						client.get('users/lookup.json', {
							screen_name: findTwitter(candidate.memberships[0].person_id.contact_details)
						}, function (error, tweets, response) {
							var twitter = JSON.parse(response.body);
							res.send({
								name: candidate.name,
								email: candidate.email,
								gender: candidate.gender,
								id: candidate.id,
								image: candidate.image ? candidate.image : 'https://s3.amazonaws.com/akiaisoxi7kjcprfrvjq/artists/placeholder.png',
								urls: candidate.memberships[0].person_id.links,
								topics: (web && web.DataTables ? web.DataTables.Topics.Data : ''),
								twitter: twitter,
								party: candidate.memberships[0].name
							});
						});
					}
				});
			}
		});
	}
});

function findLink(links) {
	var returner;
	links.forEach(function (link) {
		if (link.note.trim() === 'homepage') {
			returner = link.url;
		}
		if (!returner) {
			returner = link.url;
		}
	});
	return returner;
}


function findTwitter(links) {
	var returner;
	links.forEach(function (link) {
		if (link.type.trim() === 'twitter') {
			returner = link.value;
		}
	});
	return returner;
}
module.exports = router;
