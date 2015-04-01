'use strict';
/**
 * The main edulect app module
 *
 * @type {angular.Module}
 */

// create the app, and take any angular modules as parameters
var edulect = angular.module('edulectApp', ['ngRoute', 'ngResource']);

edulect.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {
			templateUrl: '/app/views/home.html',
			controller: 'HomeController'
		}).
        when('/postcode/:postcode', {
			templateUrl: '/app/views/postcode/',
			controller: 'PostcodeController'
		}).
        when('/parties/:partyName', {
			templateUrl: '/app/views/parties/party/',
			controller: 'PartyController'
		}).
		otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}
]);
