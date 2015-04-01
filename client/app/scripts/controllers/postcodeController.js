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
        }, function (error){
            $location.path('/');
        });

        $scope.postcode = $routeParams.postcode.toUpperCase();

        $scope.numberWithCommas = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        $scope.showCandidate = function (index) {
            $scope.currentCandidate = true;
            $scope.candidate = $scope.candidates[index];
            
            $scope.candidate.homepage = false;
            for (var i = 0; i < $scope.candidate.person_id.links.length; i += 1) {
                if($scope.candidate.person_id.links[i].note == "homepage"){  
                    Candidate.get({
                        url: $scope.candidate.person_id.links[i].url
                    }, function (data) {            
                        $scope.candidate.topics = data.DataTables.Topics.Data;
                    });
                    $scope.candidate.homepage = true;
                    break;
                }
            }
            
            if(!$scope.candidate.homepage && $scope.candidate.person_id.links[0]){  
                Candidate.get({
                    url: $scope.candidate.person_id.links[0].url
                }, function (data) {            
                    $scope.candidate.topics = data.DataTables.Topics.Data;
                });
                $scope.candidate.homepage = true;
            }
            
            for (var i = 0; i < $scope.candidate.person_id.contact_details.length; i += 1) {
                if($scope.candidate.person_id.contact_details[i].type == "twitter"){  
                    Twitter.query({
                        handle: $scope.candidate.person_id.contact_details[i].value
                    }, function (data) {            
                        data[0].followers_count = $scope.numberWithCommas(data[0].followers_count);
                        $scope.candidate.twitterProfile = data[0];
                    });
                    break;
                }
            }
        }
        
        $scope.hideCandidate = function (index) {
            $scope.currentCandidate = false;
            $scope.candidate = {};
        }
        
	}
	]);
