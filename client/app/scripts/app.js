'use strict';
/**
 * The main edulect app module
 *
 * @type {angular.Module}
 */

// create the app, and take any angular modules as parameters
var edulect = angular.module('edulectApp', ['ngRoute', 'ngResource']);

angular.module('edulectApp').directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.ngEnter, {
						'event': event
					});
				});

				event.preventDefault();
			}
		});
	};
});

edulect.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {
			templateUrl: '/app/views/home.html',
			controller: 'HomeController'
		}).
		when('/faq', {
			templateUrl: '/app/views/faq/index.html',
			controller: 'HomeController'
		}).
        when('/postcode/:postcode', {
			templateUrl: '/app/views/postcode/',
			controller: 'PostcodeController'
		}).
        when('/constituency/:id', {
			templateUrl: '/app/views/postcode/',
			controller: 'PostcodeController'
		}).
        when('/location/:lat/:lng', {
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
