
//covers index.html
var app2 = angular.module('app2', []).controller('ctrlIndex', function($scope, $http)
{
	
	
	 $http.get('/api/todos').success(function(data) {
            	$scope.bad = "unhappy";
				$scope.good = "chuffed";
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
	
	
	
	 // var badFeelings = ["unimportant", "hated", "grumpy"];
	 // var goodFeelings = ["happy", "elated", "psyched"];
	
	// $scope.bad = badFeelings[Math.floor(Math.random() * badFeelings.length)];
	// $scope.good = goodFeelings[Math.floor(Math.random() * goodFeelings.length)];
});