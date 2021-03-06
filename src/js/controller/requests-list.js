appControllers.controller('RequestsController', ['$scope', '$rootScope', '$q', function($scope, $rootScope, $q) {

        var query = new Parse.Query(Request);
        query.find({
            success: function(result) {
                $scope.$apply(function() {
                    $scope.requests = convertRequestsToDtos(result);
                });
            }
        });

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

        $rootScope.idRequest = '';
        $scope.linkClicked = function(id) {
            console.log("Id=" + id);
            localStorage.idRequest = id;
            location.href = "#/request-details"
        };
    }]);