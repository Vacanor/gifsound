var app = angular.module('gifsound', ['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider){    
    $routeProvider 
        .when('/', {
             controller: 'mainCtrl'
        })
     	.when('/mix',{
        templateUrl: 'mix.html',
        controller: 'mixCtrl',
        })
        // I added this functionality so the page is going to return results when you put the string you wanna search as a parameter in the url
         .when('/mix/:title/:title2',{
        templateUrl: 'mix.html',
        controller: 'mixCtrl'
        })
        .otherwise({
            redirectTo: "/"
        });
    $locationProvider.html5Mode(true);
});

app.controller('mainCtrl', ['$scope', '$sce', '$location', '$routeParams', '$rootScope', function($scope, $sce, $location, $routeParams, $rootScope){
	$scope.combine = function(){
		console.log(angular.element('#gif').val(), angular.element('#sound').val());
        $rootScope.gifModel = angular.element('#gif').val();
        $rootScope.soundModel = angular.element('#sound').val();
        $location.path('/mix/'+$rootScope.gifModel+'/'+$rootScope.soundModel);
	};
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
app.controller('mixCtrl', ['$scope', '$sce', '$location', '$routeParams', '$rootScope', '$route', function($scope, $sce, $location, $routeParams, $rootScope, $route){
    $scope.src = $sce.trustAsResourceUrl('https://www.youtube-nocookie.com/embed/TbsBEb1ZxWA?rel=0&amp;showinfo=0&autoplay=1&start=20&loop=1');
    checkParams();
}]);