var app = angular.module('requestApp', ['ngRoute']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/login', {
				templateUrl: 'partials/login.html'
			}).
			when('/register', {
				templateUrl: 'partials/register.html'
			}).
			otherwise({
				redirectTo: '/login'
			});
	}
]);