var appControllers = angular.module('appControllers', []);

appControllers.controller('LoginController', ['$scope', '$rootScope', '$q', function($scope, $rootScope, $q) {
	loginCallback = function(result) {
		var promise =  extractUser(result);
		promise.then(function(user) {
			$rootScope.user = user;
		});
	};

	extractUser = function(result) {
		var user = {};
		var deferred = $q.defer();

		gapi.client.load('plus', 'v1', function() {
			if (result['status']['signed_in']) {
				var request = gapi.client.plus.people.get({
					'userId': 'me'
				});

				request.execute(function(resp) {
					resp.emails.some(function(email) {
						if (email.type === 'account') {
							user.email = email.value;
						}
					})

					user.name = resp['displayName'];
					user.pic = resp['image']['url'];

					if (!user.email || !user.name || !user.pic) {
						deferred.reject();
					} else {
						deferred.resolve(user);
					}
				});
			} else {
				deferred.reject();
			}
		});
		return deferred.promise;
	}

	$scope.login = function() {
		gapi.auth.signIn({
			'clientid': '543719723243-g5d4k6aic1ugr5rf506t9rh2ohptgsf3.apps.googleusercontent.com',
			'cookiepolicy': 'single_host_origin',
			'callback': 'loginCallback',
			'approvalprompt': 'force',
			'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
		});
	};

	$scope.logout = function() {
		$rootScope.user = undefined;
	};
}]);