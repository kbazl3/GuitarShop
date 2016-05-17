angular.module("app")
    .controller("productCtrl", function($scope, adminSvc) {

        adminSvc.getProducts()
            .then(function(products) {
                $scope.products = products;
            });
    });
