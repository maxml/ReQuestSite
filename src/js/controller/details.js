appControllers.controller('DetailsController', ['$scope', '$rootScope', '$q', function($scope, $rootScope, $q) {

        $scope.vacancy = {};

        $scope.getRespondForm = function() {
            alert(123);
        };

        var id = localStorage.id;
        console.log(id);

        var query = new Parse.Query(Request);
//            query.equalTo("objectId", id);
        query.get(id, {
            success: function(results) {

                console.log(results);
                $scope.vacancy.title = results.get("title");
                console.log("Title=" + $scope.vacancy.title);
                $scope.vacancy.city = results.get("city");
                $scope.vacancy.company = results.get("company");
                $scope.vacancy.c_adress = results.get("company_address");
                $scope.vacancy.c_desc = results.get("company_description");
                $scope.vacancy.demands = results.get("demands");
                $scope.vacancy.expire = results.get("expire");
                $scope.vacancy.reward = results.get("reward");
                $scope.vacancy.salary = results.get("salary");
                $scope.vacancy.terms = results.get("terms");
                $scope.$apply();
//                    showDetails();
            },
            error: function(error) {
                console.log("Error: " + error + " " + error.message);
            }
        });

    }]);

