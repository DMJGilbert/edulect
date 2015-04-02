/*global edulect, angular, $ */
edulect.controller('PartyController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$interval', 'Candidate', 'Twitter',
	function partyController($scope, $rootScope, $http, $location, $routeParams, $interval, Candidate, Twitter) {
		'use strict';

        $scope.parties = [{'name':'Labour Party','code':'labour','url':'www.labour.org.uk/','security':'UPYGLAB index'}, {'name':'Conservative Party','code':'conservatives','url':'https://www.conservatives.com/','security':'UPYGCONS index'}, {'name':'Liberal Democrats','code':'libdem','url':'www.libdems.org.uk/','security':'UPYGLIB index'}, {'name':'UK Independence Party (UKIP)','code':'ukip','url':'www.ukip.org/','security':'UPYGUKIP index'}, {'name':'Green Party','code':'greens','url':'https://www.greenparty.org.uk/','security':'UPYGGREE index'}];        
        
        for (var i = 0; i < $scope.parties.length; i += 1) {
            if ($scope.parties[i].code == $routeParams.partyName) {
                $scope.selectedParty = $scope.parties[i];
            }
        }
        
        $scope.numberWithCommas = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        if(!$scope.selectedParty){
            $location.path('/');   
        }

        $scope.goBack = function () {
            $location.path('postcode/'+$rootScope.postcode);
        }
        
        Candidate.get({
            url: $scope.selectedParty.url
        }, function (data) {        
            $scope.selectedParty.topics = data.DataTables.Topics.Data;
        });
        
        Twitter.query({
            handle: $scope.selectedParty.twitter
        }, function (data) {        
            data[0].followers_count = $scope.numberWithCommas(data[0].followers_count);
            $scope.selectedParty.twitterProfile = data[0];
        });
        
	}
	]);