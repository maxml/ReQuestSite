appControllers.controller('RequestsController', ['$scope', '$rootScope', '$q', function($scope, $rootScope, $q) {

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
            result.id = parseRequest.id;
            result.createDate = parseRequest.updatedAt;
            result.expireDate = parseRequest.get("expire");
            result.salary = parseRequest.get("salary");
            result.company = parseRequest.get("company");
            result.title = parseRequest.get("title");
            result.reward = parseRequest.get("reward");
            return result;
        };

        $scope.vacancy = "swat";
        $scope.linkClicked = function(id) {

            console.log(id);
            var query = new Parse.Query(Request);
            query.equalTo("objectId", id);

            query.find({
                success: function(results) {
                    // Do something with the returned Parse.Object values
                    var object = results[0];
                    vacancy = object;
                    console.log(vacancy);

                    location.href = "#/details"
//                    showDetails();
                },
                error: function(error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        }
    }]);