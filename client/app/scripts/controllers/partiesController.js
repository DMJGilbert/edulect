/*global edulect, angular, $ */
edulect.controller('PartiesController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$interval', 'Support',
	function partiesController($scope, $rootScope, $http, $location, $routeParams, $interval, Support) {
		'use strict';

        $scope.parties = [{'name':'Labour Party','code':'labour','url':'www.labour.org.uk/','security':'UPYGLAB index'}, {'name':'Conservative Party','code':'conservatives','url':'https://www.conservatives.com/','security':'UPYGCONS index'}, {'name':'Liberal Democrats','code':'libdem','url':'www.libdems.org.uk/','security':'UPYGLIB index'}, {'name':'UKIP','code':'ukip','url':'www.ukip.org/','security':'UPYGUKIP index'}, {'name':'SNP','code':'snp','url':'www.snp.org/'}, {'name':'Sinn Fein','code':'sinnfein','url':'www.sinnfein.ie/'}, {'name':'Plaid Cymru','code':'plaidcymru','url':'www.plaid.cymru/'}, {'name':'Green Party','code':'greens','url':'https://www.greenparty.org.uk/','security':'UPYGGREE index'}];
        
        $scope.parties = $rootScope.shuffle($scope.parties);
                
        $scope.gotoParty = function (partyCode) {
            $location.path('/parties/'+partyCode)
        }
        
        Support.get({}, function (data) {                    
            $scope.support = data.data[0].securityData;
            
            for(var i = 0; i < $scope.support.length; i += 1) {
                for(var j = 0; j < $scope.parties.length; j += 1){    
                    if ($scope.support[i].security == $scope.parties[j].security) {
                        $scope.parties[j].support = $scope.support[i].fieldData.PX_LAST;
                    }
                }
            }
        });
	}
	]);