angular.module("app")
    .controller("mainCtrl", function($scope, adminSvc) {

        adminSvc.getProducts()
            .then(function(products) {
                $scope.products = products;
            });


});
