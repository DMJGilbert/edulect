'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function (req, res) {
	if (req.query.postcode) {
		request('http://mapit.mysociety.org/postcode/' + req.query.postcode, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var postcodeData = JSON.parse(body);
				request('http://yournextmp.popit.mysociety.org/api/v0.1/posts/' + postcodeData.shortcuts.WMC + '?embed=membership.person', function (error, response, body) {
					if (!error && response.statusCode == 200) {
						var constituency = JSON.parse(body).result;
						res.jsonp({
							name: constituency.area.name,
							candidates: filterCandidates(constituency.memberships, postcodeData.shortcuts.WMC)
						});
					}
				});
			}

		});
	}
	if (req.query.long && req.query.lat) {
		request('http://mapit.mysociety.org/point/4326/' + req.query.long + ',' + req.query.lat + '?type=WMC', function (error, response, body) {
			console.log('http://mapit.mysociety.org/point/4326/' + req.query.long + ',' + req.query.lat + '?type=WMC')
			if (!error && response.statusCode == 200) {
				var postcodeData = JSON.parse(body);
				var key = Object.keys(postcodeData)[0];
				request('http://yournextmp.popit.mysociety.org/api/v0.1/posts/' + key + '?embed=membership.person', function (error, response, body) {
					if (!error && response.statusCode == 200) {
						var constituency = JSON.parse(body).result;
						res.jsonp({
							name: constituency.area.name,
							candidates: filterCandidates(constituency.memberships, key)
						});
					}
				});
			}
		})
	}
});

router.get('/view', function (req, res) {
	request('http://yournextmp.popit.mysociety.org/api/v0.1/posts/' + req.query.id + '?embed=membership.person', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var constituency = JSON.parse(body).result;
			res.jsonp({
				name: constituency.area.name,
				candidates: filterCandidates(constituency.memberships, req.query.id)
			});
		}
	});
});

function filterCandidates(list, id) {
	var array = [];
	var ids = [];
	list.forEach(function (candidate) {
		console.log(candidate)
		if (candidate.person_id.party_memberships[2015] && candidate.person_id.standing_in[2015] && candidate.person_id.standing_in[2015].post_id == id) {
			var person = candidate.person_id;
			if (ids.indexOf(person.id) == -1) {
				ids.push(person.id);
				array.push({
					name: person.name,
					id: person.id,
					party: candidate.person_id.party_memberships["2015"].name
				})
			}
		}
	})
	return array;
}

module.exports = router;
