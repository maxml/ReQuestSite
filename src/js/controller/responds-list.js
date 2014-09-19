appControllers.controller('RespondsController', ['$scope', '$rootScope', '$q', function ($scope, $rootScope, $q) {

        // Test value
        $scope.swat = 'watRespond';

        var load = function () {

            var idRequest = localStorage.idRequest;
            var user = Parse.User.current();

            var query = new Parse.Query(Responds);

            console.log(idRequest);

            if (idRequest) {
                var queryReq = new Parse.Query(Request);
                queryReq.get(idRequest, {
                    success: function (request) {
                        query.equalTo("request", request);
                        getQuery(query);
                    },
                    error: function (object, error) {
                        console.log("Object=" + object + ", error=" + error);
                    }
                });
            } else {
                query.equalTo("user", user);
                getQuery(query);
            }

        };
        load();

        getQuery = function (query) {
            query.find({
                success: function (result) {
                    $scope.$apply(function () {
                        $scope.responds = convertRespondsToDtos(result);
                    });
                    console.log(result);
                }
            });
        }

        convertRespondsToDtos = function (parseResponds) {
            var result = [];
            for (var i = 0; i < parseResponds.length; i++) {
                result[i] = convertRespondsToDto(parseResponds[i]);
            }
            return result;
        };

        convertRespondsToDto = function (parseRespond) {
            result = {};
            result.id = parseRespond.id;
            result.createDate = parseRespond.createdAt;
            result.updateDate = parseRespond.updatedAt;
            result.name = parseRespond.get("name");
            result.comment = parseRespond.get("comment");
//            result.company = parseRespond.get("company");
//            result.title = parseRespond.get("title");
//            result.reward = parseRespond.get("reward");
            return result;
        };

        $rootScope.idRespond = '';
        $scope.linkClicked = function (id) {
            console.log("Id=" + id);
            localStorage.idRespond = id;
            location.href = "#/respond-details"
        };
    }]);



