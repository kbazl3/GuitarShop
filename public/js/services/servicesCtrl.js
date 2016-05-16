angular.module("app")
    .controller("servicesCtrl", function($scope, $anchorScroll) {

        $scope.scrollTo = function(id) {
            $anchorScroll(id);
        };

    });
