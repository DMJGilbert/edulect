'use strict';

var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function (req, res) {
	res.sendfile('./public/unis.json');
});

module.exports = router;
