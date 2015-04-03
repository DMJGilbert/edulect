/*global edulect, angular, $, md5 */

edulect.controller('RootController', ['$scope', '$rootScope', '$http', '$location',
 function rootController($scope, $rootScope, $http, $location) {
        // If user is signed in then redirect back home
        'use strict';

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

      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-61528784-1', 'auto');
      ga('send', 'pageview');

 }
 ]);
