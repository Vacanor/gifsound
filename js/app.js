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
        .when('/mix/:title*/:title2*',{
            templateUrl: 'mix.html',
            controller: 'mixCtrl'
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.controller('mainCtrl', ['$scope', '$sce', '$location', '$routeParams', '$rootScope', function($scope, $sce, $location, $routeParams, $rootScope){
    // RegEx filter to check valid urls. From https://gist.github.com/dperini/729294
    var reg_url = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    
    // Combine the sound and the gif. Get the data, procces it and build the mix
	$scope.combine = function(){
		console.log(angular.element('#gif').val().toString(), angular.element('#sound').val().toString());
        $rootScope.gifModel = angular.element('#gif').val().toString(); // Get the value of the inputs
        $rootScope.soundModel = angular.element('#sound').val().toString(); // Get the value of the inputs
        if($rootScope.gifModel || $rootScope.soundModel){// If there is at least one parameter
            filterUrl(decodeURIComponent($rootScope.gifModel), decodeURIComponent($rootScope.soundModel)); // Go chech if it is a valid url
        }else {
            console.log("no params");
        }
	};
    // This function checks that the parameter is indeed a valid url and takes action depending on result
    filterUrl = function(gif, sound){
        defineModels = function(gif, sound) {
        
        var idReg = /^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/;
        var video_id = sound.match(idReg)[3];
        $rootScope.soundFinalUrl = 'https://www.youtube.com/embed/'+video_id+'?autoplay=1&loop=1&playlist=TbsBEb1ZxWA&showinfo=0&start=65';
        console.log($rootScope.soundFinalUrl);
        }
        if((gif && gif.match(reg_url)) && (sound && sound.match(reg_url))){
            console.log("both", gif, sound);
            defineModels(gif, sound);
            $location.path('/mix/'+encodeURIComponent(gif)+'/'+encodeURIComponent(sound)); // Put parameters into the url
        }else if (gif && gif.match(reg_url)){
            console.log('just gif', gif);
            defineModels(gif, " ");
            $location.path('/mix/'+encodeURIComponent(gif)+'/ '); // Put parameters into the url
        }else if(sound && sound.match(reg_url)){
            console.log('just sound', sound);
            defineModels(" ", sound);
            $location.path('/mix/ /'+encodeURIComponent(sound)); // Put parameters into the url
        }else {
            console.log('Url Not valid');
        }
        
    }
    // To get the data from the url and change the header title and subtitle classes respectively
    checkParams = function(){            
            if($routeParams.title !== undefined || $routeParams.title2 !== undefined){
                filterUrl(decodeURIComponent($rootScope.gifModel), decodeURIComponent($rootScope.soundModel));
                $scope.ngTitle = 'title-active';
                $scope.ngSubtitle = 'subtitle-active';
                $rootScope.gifModel = decodeURIComponent($routeParams.title);
                $rootScope.soundModel = decodeURIComponent($routeParams.title2);
            }
            else if($routeParams.title === undefined || $routeParams.title2 === undefined){
                $scope.ngTitle = 'title';
                $scope.ngSubtitle = 'subtitle';
                $rootScope.gifModel = '';
                $rootScope.soundModel = '';
            }
    }
    // We need to bring things back to the home state if we go back to the root path with no parameters
    backHome = function(){
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
          if ( $location.path() == "/" ) {
            $scope.ngTitle = 'title';
            $scope.ngSubtitle = 'subtitle';
            $rootScope.gifModel = '';
            $rootScope.soundModel = '';
          }         
        });
    }
    
    backHome();
    checkParams();

}]);
app.controller('mixCtrl', ['$scope', '$sce', function($scope, $sce){
    //$scope.src = $sce.trustAsResourceUrl('https://www.youtube-nocookie.com/embed/TbsBEb1ZxWA?rel=0&amp;showinfo=0&autoplay=1&start=20&loop=1');
    checkParams();
    backHome();
}]);