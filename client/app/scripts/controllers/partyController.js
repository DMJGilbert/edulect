/*global edulect, angular, $ */
edulect.controller('PartyController', ['$scope', '$rootScope', '$http', '$location', '$routeParams', '$interval', 'Candidate', 'Support', 'Twitter',
	function partyController($scope, $rootScope, $http, $location, $routeParams, $interval, Candidate, Support, Twitter) {
		'use strict';

        $scope.parties = [{'name':'Labour Party','code':'labour','url':'www.labour.org.uk/','security':'UPYGLAB index', 'image':'https://pbs.twimg.com/profile_images/532896732690911232/2H5BLvn0.png','twitter':'UKLabour'}, {'name':'Conservative Party','code':'conservatives','url':'https://www.conservatives.com/','security':'UPYGCONS index', 'image':'https://pbs.twimg.com/profile_images/513282461300572160/09NoY2fM.jpeg','twitter':'Conservatives'}, {'name':'Liberal Democrats','code':'libdem','url':'www.libdems.org.uk/','security':'UPYGLIB index', 'image':'https://pbs.twimg.com/profile_images/576709452667064322/58wI9ory.jpeg','twitter':'LibDems'}, {'name':'UKIP','code':'ukip','url':'www.ukip.org/','security':'UPYGUKIP index', 'image' : 'https://pbs.twimg.com/profile_images/508028681953243136/8DrVhDgX.jpeg','twitter':'UKIP'}, {'name':'SNP','code':'snp','url':'www.snp.org/', 'image':'https://pbs.twimg.com/profile_images/567315062738927619/L7O41SAm.jpeg','twitter':'@theSNP'}, {'name':'Sinn Fein','code':'sinnfein','url':'www.sinnfein.ie/', 'image' : 'https://pbs.twimg.com/profile_images/2409134921/xq5u2wc2c6a0nuhmcd7h.png'}, {'name':'Plaid Cymru','code':'plaidcymru','url':'www.plaid.cymru/', 'image':'https://pbs.twimg.com/profile_images/378800000232460666/81802a6920e71934af7bb145fc814640.jpeg', 'twitter':'Plaid_Cymru'}, {'name':'Green Party','code':'greens','url':'https://www.greenparty.org.uk/','security':'UPYGGREE index', 'image':'https://pbs.twimg.com/profile_images/470520794708066304/jthaGzkw.png', 'twitter':'TheGreenParty'}];
        
        
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
        
        Support.get({}, function (data) {                    
            $scope.support = data.data[0].securityData;
            
            for(var i = 0; i < $scope.support.length; i += 1) {
                if ($scope.support[i].security == $scope.selectedParty.security) {
                    $scope.selectedParty.support = $scope.support[i].fieldData.PX_LAST;
                }
            }
        });
	}
	]);