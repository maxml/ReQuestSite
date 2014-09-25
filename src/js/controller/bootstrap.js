appControllers = angular.module('appControllers', []);

//Dynamic title
angular.module('publicRegApp', [])
        .controller('CompanyNameController', function ($scope) {
            $scope.title = 'ReQuest - recruititng platform';

            $scope.onSearchHome = function () {
                $scope.title = "ReQuest - recruititng platform";
            };

            $scope.onSearchAbout = function () {
//        console.log("clicked");
                $scope.title = "ReQuest - About";
            };

            $scope.onSearchPortfolio = function () {
                $scope.title = "ReQuest - Portfolio";
            };

            $scope.onSearchIndustries = function () {
                $scope.title = "ReQuest - Industries";
            };

        });