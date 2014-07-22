appControllers.controller('RequestsController', ['$scope', '$rootScope', '$q', function($scope, $rootScope, $q) {
        $scope.wat = "swat";

        var query = new Parse.Query(Request);
        query.find({
            success: function(result) {
                $scope.$apply(function() {
                    $scope.requests = convertRequestsToDtos(result);
                });
                console.log(result);
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
            result.city = parseRequest.get("city");
            result.company = parseRequest.get("company");
            result.title = parseRequest.get("title");
            result.reward = parseRequest.get("reward");
            return result;
        };
    }]);