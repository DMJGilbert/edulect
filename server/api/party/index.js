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

var parties = {
	'LAB': {
		'name': 'Labour Party',
		'url': 'www.labour.org.uk/',
		'image': 'https://pbs.twimg.com/profile_images/532896732690911232/2H5BLvn0.png',
		'twitter': 'UKLabour'
	},
	'CON': {
		'name': 'Conservative Party',
		'url': 'https://www.conservatives.com/',
		'image': 'https://pbs.twimg.com/profile_images/513282461300572160/09NoY2fM.jpeg',
		'twitter': 'Conservatives'
	},
	'LIB': {
		'name': 'Liberal Democrats',
		'url': 'www.libdems.org.uk/',
		'image': 'https://pbs.twimg.com/profile_images/576709452667064322/58wI9ory.jpeg',
		'twitter': 'LibDems'
	},
	'UKI': {
		'url': 'www.ukip.org/',
		'image': 'https://pbs.twimg.com/profile_images/508028681953243136/8DrVhDgX.jpeg',
		'twitter': 'UKIP'
	},
	'SNP': {
		'url': 'www.snp.org/',
		'image': 'https://pbs.twimg.com/profile_images/567315062738927619/L7O41SAm.jpeg',
		'twitter': '@theSNP'
	},
	'SIN': {
		'name': 'Sinn Fein',
		'url': 'www.sinnfein.ie/',
		'image': 'https://pbs.twimg.com/profile_images/2409134921/xq5u2wc2c6a0nuhmcd7h.png'
	},
	'PLC': {
		'name': 'Plaid Cymru',
		'url': 'www.plaid.cymru/',
		'image': 'https://pbs.twimg.com/profile_images/378800000232460666/81802a6920e71934af7bb145fc814640.jpeg',
		'twitter': 'Plaid_Cymru'
	},
	'GRP': {
		'name': 'Green Party',
		'url': 'https://www.greenparty.org.uk/',
		'image': 'https://pbs.twimg.com/profile_images/470520794708066304/jthaGzkw.png',
		'twitter': 'TheGreenParty'
	}
};

router.get('/', function (req, res) {
	if (req.query.id) {
		request.post('http://enterprise.majesticseo.com/api/json', {
			form: {
				app_api_key: process.env.MAJESTICAPI,
				item: findLink(candidate.memberships[0].person_id.links),
				cmd: 'GetTopics'
			}
		}, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var web = JSON.parse(body);
				client.get('users/lookup.json', {
					screen_name: findTwitter(candidate.memberships[0].person_id.contact_details)
				}, function (error, tweets, response) {
					var twitter = JSON.parse(response.body);
					res.send({
						name: candidate.name,
						gender: candidate.gender,
						id: candidate.gender,
						image: candidate.image ? candidate.image : 'https://s3.amazonaws.com/akiaisoxi7kjcprfrvjq/artists/placeholder.png',
						urls: candidate.memberships[0].person_id.links,
						topics: (web && web.DataTables ? web.DataTables.Topics.Data : ''),
						twitter: twitter,
						party: candidate.party_memberships['2015'].name
					});
				});
			}
		});
	}
});

module.exports = router;