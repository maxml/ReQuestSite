appControllers.controller('MyRequestsController', ['$scope', '$rootScope', '$q', function($scope, $rootScope, $q) {

        $scope.swat = 'wat';
        var load = function() {

            var user = Parse.User.current();

            var query = new Parse.Query(Request);
            query.equalTo("user", user);
            query.find({
                success: function(result) {
                    $scope.$apply(function() {
                        $scope.requests = convertRequestsToDtos(result);
                    });
                    console.log(result);
                }
            });
        };
        load();

        convertRequestsToDtos = function(parseRequests) {
            var result = [];
            for (var i = 0; i < parseRequests.length; i++) {
                result[i] = convertRequestToDto(parseRequests[i]);
            }
            return result;
        };

        convertRequestToDto = function(parseRequest) {
            result = {};
            result.id = parseRequest.id;
            result.createDate = parseRequest.updatedAt;
            result.expireDate = parseRequest.get("expire");
            result.salary = parseRequest.get("salary");
            result.company = parseRequest.get("company");
            result.title = parseRequest.get("title");
            result.reward = parseRequest.get("reward");
            return result;
        };

        $rootScope.id = '';
        $scope.linkClicked = function(id) {
            console.log("Id=" + id);
            localStorage.id = id;
            location.href = "#/details"
        };
    }]);

