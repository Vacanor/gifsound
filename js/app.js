var app = angular.module('gifsound', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider){    
    $routeProvider 
        .when('/', {
             controller: 'mainCtrl'
        })
     	.when('/mix',{
            templateUrl: 'mix.html',
            controller: 'mixCtrl'
        })
        // Adding this routing allows to save soundgifs
        .when('/mix/:title/:title2',{
            templateUrl: 'mix.html',
            controller: 'mixCtrl'
        })
        .otherwise({
            redirectTo: "/"
        });
    // $locationProvider.html5Mode(true);
});

app.controller('mainCtrl', ['$scope', '$sce', '$location', '$routeParams', '$rootScope', function($scope, $sce, $location, $routeParams, $rootScope){
    // Combine the sound and the gif. Get the data, procces it and build the mix
	$scope.combine = function(){
		// console.log(angular.element('#gif').val(), angular.element('#sound').val());
        $rootScope.gifModel = angular.element('#gif').val(); // Get the value of the inputs
        $rootScope.soundModel = angular.element('#sound').val(); // Get the value of the inputs
        $location.path('/mix/'+$rootScope.gifModel+'/'+$rootScope.soundModel); // Put parameters into the url
	};
    // To get the data from the url and change the header title and subtitle classes respectively
    checkParams = function(){            
            if($routeParams.title === undefined || $routeParams.title2 === undefined){
                // console.log($routeParams.title, $routeParams.title2);
                $scope.ngTitle = 'title';
                $scope.ngSubtitle = 'subtitle';
            }
            if($routeParams.title !== undefined || $routeParams.title2 !== undefined) {
                // console.log($routeParams.title, $routeParams.title2);
                $scope.ngTitle = 'title-active';
                $scope.ngSubtitle = 'subtitle-active';
                $rootScope.gifModel = $routeParams.title;
                $rootScope.soundModel = $routeParams.title2;
            }
    }
    checkParams();
}]);
app.controller('mixCtrl', ['$scope', '$sce', function($scope, $sce){
    $scope.src = $sce.trustAsResourceUrl('https://www.youtube-nocookie.com/embed/TbsBEb1ZxWA?rel=0&amp;showinfo=0&autoplay=1&start=20&loop=1');
    checkParams();
}]);