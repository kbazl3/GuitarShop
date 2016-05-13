angular.module("app")
    .controller("adminCtrl", function($scope, adminSvc, $state) {

        $scope.adminUser = true;

        $scope.addProduct = function(make, price, img, model, summary, condition) {
            adminSvc.addNewProduct(make, price, img, model, summary, condition);
        };

        $scope.deleteProduct = function(id) {
            adminSvc.destroyProduct(id);
        };

        $scope.updateProduct = function(id, name, price, img, model, summary, condition) {
            adminSvc.updateProduct(id, name, price, img, model, summary, condition);
        };

        adminSvc.getProducts()
            .then(function(products) {
                $scope.products = products;
            });

        $scope.adminLogin = function() {
            adminSvc.adminLogin($scope.credentials)
                .then(function(response) {
                    console.log("dd", response);
                    if (response) {
                        $scope.adminUser = false;
                    } else {
                        alert('Insufficient Admin Credentials');
                    }
                    // $scope.adminUser = true;
                });
            // $scope.adminUser = false;
        };
});
