/*global edulect, angular, $ */
edulect.controller('PartyController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$interval', 'Parties',
	function partyController($scope, $rootScope, $http, $location, $routeParams, $interval, Parties) {
		'use strict';

        $scope.parties = [{'name':'Labour Party','code':'labour','url':'www.labour.org.uk/','security':'UPYGLAB index','api':'LAB'}, {'name':'Conservative Party','code':'conservatives','url':'https://www.conservatives.com/','security':'UPYGCONS index','api':'CON'}, {'name':'Liberal Democrats','code':'libdem','url':'www.libdems.org.uk/','security':'UPYGLIB index','api':'LIB'}, {'name':'UK Independence Party (UKIP)','code':'ukip','url':'www.ukip.org/','security':'UPYGUKIP index','api':'UKI'}, {'name':'Green Party','code':'greens','url':'https://www.greenparty.org.uk/','security':'UPYGGREE index','api':'GRP'}];        
        
        for (var i = 0; i < $scope.parties.length; i += 1) {
            if ($scope.parties[i].code == $routeParams.partyName) {
                $scope.selectedParty = $scope.parties[i];

                Parties.get({
                    id: $scope.selectedParty.api
                }, function (data) {
                    console.log(data);
                });
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
        
	}
	]);