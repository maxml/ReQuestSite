var app = angular.module('requestApp', ['ngRoute', 'appControllers', 'angular-carousel', 'ngAnimate']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/home', {
                    templateUrl: 'partials/home.html',
                    controller: 'LoginController'
                }).
                when('/requests', {
                    templateUrl: 'partials/requests.html',
                    controller: 'RequestsController'
                }).
                when('/my-requests', {
                    templateUrl: 'partials/my-requests.html',
                    controller: 'MyRequestsController'
                }).
                when('/new-vacancy', {
                    templateUrl: 'partials/new-vacancy.html',
                    controller: 'NewVacancyController'
                }).
                when('/request-details', {
                    templateUrl: 'partials/details.html',
                    controller: 'DetailsController'
                }).
                when('/respond-details', {
                    templateUrl: 'partials/details.html',
                    controller: 'DetailsController'
                }).
                when('/responds', {
                    templateUrl: 'partials/responds.html',
                    controller: 'RespondsController'
                }).
                otherwise({
                    redirectTo: 'home'
                });
    }
]).run(function ($rootScope) {
    Parse.initialize("V10TgoAKTJ7B8H8YjJhgucaXdGiDeROgxACn6aA2", "1gGbFOhUUrgeVp7JkqLP4XkOc8mBWkrQCU1uKAi8");

    User = Parse.Object.extend("User");
    Wallet = Parse.Object.extend("Wallet");
    Request = Parse.Object.extend("Requests");
    Responds = Parse.Object.extend("Responds");

    // Load user from session if exists
    var currentParseUser = User.current();
    if (currentParseUser) {
        var user = {};
        user.email = currentParseUser.get("username");
        user.name = currentParseUser.get("name");
        user.pic = currentParseUser.get("avatar");

        $rootScope.$apply(function () {
            $rootScope.user = user;
        });
    }
    ;

    $rootScope.isNoStorage = function () {
        return (typeof (Storage) === "undefined");
    };

    $rootScope.isOnRespondPage = function () {
        if (!location.href.match(/\responds/)) {
            localStorage.idRequest = '';
            location.href = "#/responds";
        }
        location.reload();
    };
});



//Dinamic title
angular.module('publicRegApp', [])

  .controller('CompanyNameController', function ($scope) {
    $scope.title = 'ReQuest - recruititng platform';


    $scope.onSearchHome = function(){
        console.log("clicked");
        $scope.title = "ReQuest - recruititng platform";
    };
    
    $scope.onSearchAbout = function(){
        console.log("clicked");
        $scope.title = "ReQuest - About";
    };

    $scope.onSearchPortfolio = function(){
        console.log("clicked");
        $scope.title = "ReQuest - Portfolio";
    };
    
    $scope.onSearchIndustries = function(){
        console.log("clicked");
        $scope.title = "ReQuest - Industries";
    };

  });