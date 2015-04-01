/*global edulect, angular, $ */
edulect.controller('PostcodeController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$interval', 'Postcode', 'Candidate', 'Twitter',
 function homeController($scope, $rootScope, $http, $location, $routeParams, $interval, Postcode, Candidate, Twitter) {
        'use strict';

        $scope.candidates = [];

        if (!$routeParams.postcode) {
            $location.path('/');
        }

        Postcode.get({
            postcode: $routeParams.postcode
        }, function (data) {
            $scope.candidates = data.candidates;
            $scope.constituency = data.name;
        }, function (error) {
            $location.path('/');
        });

        $scope.postcode = $routeParams.postcode.toUpperCase();

        $scope.numberWithCommas = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        $scope.showCandidate = function (index) {
            $scope.currentCandidate = true;
            $scope.candidate = $scope.candidates[index];

            Candidate.get({
                id: $scope.candidates[index].id
            }, function (data) {
                $scope.candidate = data;
                $scope.candidate.twitterProfile = $scope.candidate.twitter[0];
            });
        }

        $scope.hideCandidate = function (index) {
            $scope.currentCandidate = false;
            $scope.candidate = {};
        }

    }
    ]);