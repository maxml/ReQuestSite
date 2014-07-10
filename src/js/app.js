var app = angular.module('requestApp', ['ngRoute', 'appControllers']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('login', {
				templateUrl: 'partials/login.html'
			}).
			when('register', {
				templateUrl: 'partials/register.html'
			}).
			otherwise({
				redirectTo: 'login'
			});
	}
]).run(function($rootScope) {
	Parse.initialize("V10TgoAKTJ7B8H8YjJhgucaXdGiDeROgxACn6aA2", "1gGbFOhUUrgeVp7JkqLP4XkOc8mBWkrQCU1uKAi8");

	User = Parse.Object.extend("User");
	Wallet = Parse.Object.extend("Wallet");

	console.log($rootScope);
	// Load user from session if exists
	var currentParseUser = User.current();
	if (currentParseUser !== undefined) {
		var user = {};
		user.email = currentParseUser.get("username");
		user.name = currentParseUser.get("name");
		user.pic = currentParseUser.get("avatar");

		$rootScope.$apply(function() {
			$rootScope.user = user;
		});
	}
});

