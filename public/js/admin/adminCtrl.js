angular.module("app")
    .controller("adminCtrl", function($scope, adminSvc, $state) {

        $scope.adminUser = true;
        $scope.manageProducts = true;
        $scope.manageAdmins = true;

        $scope.addProduct = function(product) {
            adminSvc.addNewProduct(product);
            callGetProducts();
        };

        $scope.deleteProduct = function(id) {
            adminSvc.destroyProduct(id);
            callGetProducts();
        };

        $scope.updateProduct = function(id, name, price, img, model, summary, condition, type) {
            adminSvc.updateProduct(id, name, price, img, model, summary, condition, type);
            callGetProducts();
        };

        var callGetProducts = function() {
            adminSvc.getProducts()
                .then(function(products) {
                    $scope.products = products;
                });
        };
        callGetProducts();


        $scope.adminLogin = function() {
            adminSvc.adminLogin($scope.credentials)
                .then(function(response) {
                    console.log("dd", response);
                    if (response) {
                        $scope.adminUser = false;
                        $scope.adminLoginBoxes = true;
                    } else {
                        alert('Insufficient Admin Credentials');
                    }
                    // $scope.adminUser = true;
                });
            // $scope.adminUser = false;
        };

        var callGetAdmins = function() {
            adminSvc.getAdmins()
                .then(function(admins) {
                    $scope.admins = admins;
                });
        };
        callGetAdmins();

        $scope.addAdmin = function(admin) {
            adminSvc.addAdmin(admin);
            callGetAdmins();
        };

        $scope.updateAdmin = function(id, admin) {
            adminSvc.updateAdmin(id, admin);
            callGetAdmins();
        };

        $scope.deleteAdmin = function(id) {
            adminSvc.deleteAdmin(id);
            callGetAdmins();
        };

        $scope.toggleManageProducts = function() {
            $scope.manageProducts = !$scope.manageProducts;
        };

        $scope.toggleManageAdmins = function() {
            $scope.manageAdmins = !$scope.manageAdmins;
        };
});
