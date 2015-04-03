/*global edulect, angular, $ */
edulect.controller('HomeController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$timeout', 'University', 'Constituencies',
 function homeController($scope, $rootScope, $http, $location, $routeParams, $timeout, University, Constituencies) {
        'use strict';

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    x.innerHTML = "Geolocation is not supported by this browser.";
                }
            }
            function showPosition(position) {
                $scope.latitude = position.coords.latitude;
                $scope.longitude = position.coords.longitude;
            }

        getLocation();

        $scope.postcode = true;
        $scope.constituency = false;
        $scope.university = false;

        $scope.registerCloses = new Date('04/03/2015 11:00 PM');
        $scope.pollsOpen = new Date('04/03/2015 11:20 AM');
        $scope.pollsClose = new Date('04/04/2015 00:00 A');

        $scope.second = 1000;
        $scope.minute = $scope.second * 60;
        $scope.hour = $scope.minute * 60;
        $scope.day = $scope.hour * 24;
        $scope.timer;

        $scope.showRemaining = function () {
            $scope.now = new Date();

            $scope.registerClosesIn = $scope.registerCloses - $scope.now;
            $scope.pollsOpenIn = $scope.pollsOpen - $scope.now;
            $scope.pollsCloseIn = $scope.pollsClose - $scope.now;

            if ($scope.registerClosesIn < 0) {
                $scope.registerClosesRemaining = 'Closed!';
            } else {
                $scope.days1 = Math.floor($scope.registerClosesIn / $scope.day);
                $scope.hours1 = Math.floor(($scope.registerClosesIn % $scope.day) / $scope.hour);
                $scope.minutes1 = Math.floor(($scope.registerClosesIn % $scope.hour) / $scope.minute);
                $scope.seconds1 = Math.floor(($scope.registerClosesIn % $scope.minute) / $scope.second);

                $scope.registerClosesRemaining = $scope.days1 + ' days ';
                $scope.registerClosesRemaining += $scope.hours1 + ' hrs ';
                $scope.registerClosesRemaining += $scope.minutes1 + ' mins ';
                $scope.registerClosesRemaining += $scope.seconds1 + ' secs';
            }

            if ($scope.pollsOpenIn < 0) {
                $scope.pollOpenRemaining = '';
            } else {
                $rootScope.endOfElection = false;
                $scope.days2 = Math.floor($scope.pollsOpenIn / $scope.day);
                $scope.hours2 = Math.floor(($scope.pollsOpenIn % $scope.day) / $scope.hour);
                $scope.minutes2 = Math.floor(($scope.pollsOpenIn % $scope.hour) / $scope.minute);
                $scope.seconds2 = Math.floor(($scope.pollsOpenIn % $scope.minute) / $scope.second);

                $scope.pollOpenRemaining = $scope.days2 + ' days ';
                $scope.pollOpenRemaining += $scope.hours2 + ' hrs ';
                $scope.pollOpenRemaining += $scope.minutes2 + ' mins ';
                $scope.pollOpenRemaining += $scope.seconds2 + ' secs';
            }

            if ($scope.pollsCloseIn < 0) {
                clearInterval($scope.timer);
                $scope.pollCloseRemaining = 'Closed!';
                $rootScope.endOfElection = true;
            } else {
                $rootScope.endOfElection = false;
                $scope.days3 = Math.floor($scope.pollsCloseIn / $scope.day);
                $scope.hours3 = Math.floor(($scope.pollsCloseIn % $scope.day) / $scope.hour);
                $scope.minutes3 = Math.floor(($scope.pollsCloseIn % $scope.hour) / $scope.minute);
                $scope.seconds3 = Math.floor(($scope.pollsCloseIn % $scope.minute) / $scope.second);

                $scope.pollCloseRemaining = $scope.days3 + ' days ';
                $scope.pollCloseRemaining += $scope.hours3 + ' hrs ';
                $scope.pollCloseRemaining += $scope.minutes3 + ' mins ';
                $scope.pollCloseRemaining += $scope.seconds3 + ' secs';
            }
            $scope.mytimeout = $timeout($scope.showRemaining, 1000);
        }

        $scope.showRemaining();

        University.query({}, function (data) {
            $scope.universities = data;
            $('.ui.dropdown').dropdown({
                fullTextSearch: true
            });
        });

        Constituencies.query({}, function (data) {
            $scope.constituencies = data;
            $('.ui.dropdown').dropdown({
                fullTextSearch: true
            });
        });

        $scope.gotoPostcode = function () {
            if($scope.myPostcode) {
                $scope.myPostcode = $scope.myPostcode.replace(/\s/g, '');
                 $location.path("/postcode/" + $scope.myPostcode);
            }
        }

        $scope.gotoMyLocation = function () {
            $location.path("/location/" + $scope.latitude +'/' + $scope.longitude);
        }

        $scope.gotoConstituency = function (conId) {
            $location.path("/constituency/" + conId);
        }

        $scope.gotoUniPostcode = function (uni) {
            uni.postcode = uni.postcode.replace(/\s/g, '');
            $location.path("/postcode/" + uni.postcode);
        }

        $(function () {
            $('#js-news').ticker({
                htmlFeed: false,
                ajaxFeed: true,
                feedUrl: '/api/rss',
                feedType: 'xml'
            });
        });

 }
 ]);
