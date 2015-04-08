/*global edulect, angular, $, md5 */

edulect.controller('RootController', ['$scope', '$rootScope', '$http', '$location',
 function rootController($scope, $rootScope, $http, $location) {
        // If user is signed in then redirect back home
        'use strict';

        if(!$rootScope.currentPath) {
            $rootScope.currentPath = 'null';
        } else if($rootScope.currentPath != 'null'){
            console.log($rootScope.currentPath);
            $location.path($rootScope.currentPath);
        }

        $rootScope.postcode = '';

        $rootScope.endOfElection = true;

        $rootScope.shuffle = function (array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }


 }
 ]);
