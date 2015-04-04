/*global edulect, angular, $ */
edulect.controller('PostcodeController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$interval', 'Postcode', 'Candidate', 'Twitter',
 function homeController($scope, $rootScope, $http, $location, $routeParams, $interval, Postcode, Candidate, Twitter) {
        'use strict';

        $scope.candidates = [];

        if ($rootScope.endOfElection) {
            $location.path('/');
        }

        $rootScope.postcode = $routeParams.postcode;

        $scope.parties = [{'name':'Labour Party','code':'labour','url':'www.labour.org.uk/','security':'UPYGLAB index'}, {'name':'Conservative Party','code':'conservatives','url':'https://www.conservatives.com/','security':'UPYGCONS index'}, {'name':'Liberal Democrats','code':'libdem','url':'www.libdems.org.uk/','security':'UPYGLIB index'}, {'name':'UK Independence Party (UKIP)','code':'ukip','url':'www.ukip.org/','security':'UPYGUKIP index'}, {'name':'Green Party','code':'greens','url':'https://www.greenparty.org.uk/','security':'UPYGGREE index'}];

        $scope.getPartyCode = function (candidate){
            if(candidate){
                for (var i = 0; i < $scope.parties.length; i += 1) {
                    if ($scope.parties[i].name == candidate.party){
                        candidate.partyCode = $scope.parties[i].code;
                        return true;
                    }
                }
            }
            return false;
        }

       if ($location.path().indexOf('/postcode') != -1){
            if (!$routeParams.postcode) {
                $location.path('/');
            }

            Postcode.get({
                    postcode: $routeParams.postcode
                }, function (data) {
                    if(data.name){
                        $scope.candidates = data.candidates;
                        $scope.constituency = data.name;
                    }else {
                        $location.path('/');
                    }
                }, function (error) {
                    $location.path('/');
                });

                $scope.postcode = $routeParams.postcode.toUpperCase();

       } else if ($location.path().indexOf('/constituency') != -1){
            if (!$routeParams.id) {
                $location.path('/');
            }

            Postcode.get({
                    id: $routeParams.id
                }, function (data) {
                    if(data.name){
                        $scope.candidates = data.candidates;
                        $scope.constituency = data.name;
                    }else {
                        $location.path('/');
                    }
                }, function (error) {
                    $location.path('/');
                });

       } else if ($location.path().indexOf('/location') != -1){
            if (!$routeParams.lng || !$routeParams.lat) {
                $location.path('/');
            }

            Postcode.get({
                    long: $routeParams.lng,
                    lat: $routeParams.lat
                }, function (data) {
                    if(data.name){
                        $scope.candidates = data.candidates;
                        $scope.constituency = data.name;
                    }else {
                        $location.path('/');
                    }
                }, function (error) {
                    $location.path('/');
                });
       }


        $scope.numberWithCommas = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        $scope.showCandidate = function (index) {
            $scope.currentCandidate = true;
            $scope.selectedParty = $scope.candidates[index].party;
            $scope.candidate.received = false;

            Candidate.get({
                id: $scope.candidates[index].id
            }, function (data) {
                $scope.candidate = data;
                $scope.candidate.party = $scope.selectedParty;
                $scope.getPartyCode($scope.candidate);
                console.log($scope.candidate);
                $scope.candidate.received = true;
                $scope.candidate.twitterProfile = $scope.candidate.twitter[0];
            });
        }

        $scope.hideCandidate = function (index) {
            $scope.candidate.image = 'https://s3.amazonaws.com/akiaisoxi7kjcprfrvjq/artists/placeholder.png';
            $scope.currentCandidate = false;
            $scope.candidate = {};
        }

    }
    ]);