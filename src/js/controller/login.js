appControllers.controller('LoginController', ['$scope', '$rootScope', '$q', function($scope, $rootScope, $q) {
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
		User.logOut();
		$rootScope.user = undefined;
	};

	loginCallback = function(result) {
		var promise =  extractUser(result);
		var parseUser = null;
		promise.then(function(user) {
			parseUser = convertUserToParseFormat(user);
			findUser(user.email).then(function(result) {
				if (!result) {
					storeUserToParse(convertUserToParseFormat(user));
				}
			});
			parseUser.logIn().then(function(){
				$rootScope.$apply(function() {
					$rootScope.user = user;
				})
			});
		});
	};

	convertUserToParseFormat = function(rawUser) {
		var readyToStoreUser = new User();

		readyToStoreUser.set("username", rawUser.email);
		readyToStoreUser.set("name", rawUser.name);
		readyToStoreUser.set("avatar", rawUser.pic);
		readyToStoreUser.set("password", "my-pass");

		return readyToStoreUser;
	};

	storeUserToParse = function(readyToStoreUser) {
		readyToStoreUser.signUp(null, {
			success: function(storedUser) {
				addWalletToUser(storedUser);
			}
		});

		return readyToStoreUser;
	};

	findUser = function(email) {
		var deferred = $q.defer();
		var query = new Parse.Query(User);

		query.equalTo("username", email);
		return query.first();
	};

	addWalletToUser = function(parseUser) {
		var wallet = new Wallet();
		wallet.set("total", 0);
		parseUser.set("wallet", wallet);
		parseUser.save();
	};

	extractUser = function(result) {
		var user = {};
		var deferred = $q.defer();

		gapi.client.load('plus', 'v1', function() {
			if (result.status.signed_in) {
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
}]);