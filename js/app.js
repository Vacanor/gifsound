var app = angular.module('gifsound', ['ngResource', 'ngRoute']);
app.controller('mainCtrl', ['$scope', function($scope){
	$scope.gifModel = "";
	$scope.soundModel = "";
	$scope.timeModel = "";
	$scope.combine = function(){
		console.log($scope.gifModel, $scope.soundModel, $scope.timeModel);
	};
}]);