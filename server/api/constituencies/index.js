'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function (req, res) {
	res.sendfile('./client/constituencies.json');
});

module.exports = router;
