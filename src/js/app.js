var app = angular.module('requestApp', ['ngRoute', 'appControllers', 'angular-carousel', 'ngAnimate']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/home', {
                    templateUrl: 'partials/home.html',
                    controller: 'LoginController'
                }).
                when('/requests', {
                    templateUrl: 'partials/requests.html',
                    controller: 'RequestsController'
                }).
                when('/new-vacancy', {
                    templateUrl: 'partials/new-vacancy.html',
                    controller: 'NewVacancyController'
                }).
                when('/details', {
                    templateUrl: 'partials/details.html',
                    controller: 'DetailsController'
                }).
                otherwise({
                    redirectTo: 'home'
                });
    }
]).run(function($rootScope) {
    Parse.initialize("V10TgoAKTJ7B8H8YjJhgucaXdGiDeROgxACn6aA2", "1gGbFOhUUrgeVp7JkqLP4XkOc8mBWkrQCU1uKAi8");

    User = Parse.Object.extend("User");
    Wallet = Parse.Object.extend("Wallet");
    Request = Parse.Object.extend("Requests");

    // Load user from session if exists
    var currentParseUser = User.current();
    if (currentParseUser) {
        var user = {};
        user.email = currentParseUser.get("username");
        user.name = currentParseUser.get("name");
        user.pic = currentParseUser.get("avatar");

        $rootScope.$apply(function() {
            $rootScope.user = user;
        });
    }
});
