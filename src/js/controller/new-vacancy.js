appControllers.controller('NewVacancyController', ['$scope', '$rootScope', '$q', function($scope, $rootScope, $q) {

    $scope.page = 'first';

    $scope.storeVacancy = function(vacancy) {
        $scope.vacancy = angular.copy(vacancy);
    };

    $scope.goToPage = function(page, vacancy) {
        $scope.storeVacancy(vacancy);
        if ($scope.isVacancyValid())
            $scope.page = page;
    };

    $scope.sendVacancyToParse = function() {
        var vacancyEntity = $scope.getEntityFromForm();
        vacancyEntity.save(null, {
            success: function(vacancy) {
                console.log("success");
            },
            error: function(vacancy, error) {
                console.log(error);
            }
        });
    };

    $scope.isVacancyValid = function() {
        if (!$scope.vacancy) {
            return false;
        }
        if (!$scope.vacancy.name) {
            return false;
        }
        return true;
    };

    $scope.getEntityFromForm = function() {
        var result = new Request();

        result.set("city", $scope.vacancy.city);
        result.set("company", $scope.vacancy.companyName);
        result.set("company_address", $scope.vacancy.address);
        result.set("company_description", $scope.vacancy.companyDescription);
        result.set("demands", $scope.vacancy.demands);
        result.set("expire", $scope.vacancy.expire);
        result.set("reward", $scope.vacancy.reward);
        result.set("terms", $scope.vacancy.terms);
        result.set("title", $scope.vacancy.name);

        $scope.vacancy = {};
        return result;
    };
}]);

