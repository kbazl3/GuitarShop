angular.module("app")
    .service("adminSvc", function($http) {

        this.getProducts = function() {
            return $http({
                method: "GET",
                url: "/api/products"
            })
            .then(function(response) {
                return response.data;
            });
        };

        this.addNewProduct = function(newProduct) {
            return $http({
                method: "POST",
                url: '/api/products',
                data: {
                    make: newProduct.make,
                    price: newProduct.price,
                    image: newProduct.image,
                    model: newProduct.model,
                    summary: newProduct.summary,
                    condition: newProduct.condition,
                    category: newProduct.category
                }
            })
            .then(function(response) {
                return response;
            });
        };

        this.destroyProduct = function(id) {
            console.log(id);
            return $http({
                method: "DELETE",
                url: "/api/products/" + id
            })
            .then(function(response) {
                console.log(response);
            });
        };

        this.updateProduct = function(id, newProduct) {
            return $http({
                method: "PUT",
                url: "/api/products/" + id,
                data: {
                    make: newProduct.make,
                    price: newProduct.price,
                    image: newProduct.image,
                    model: newProduct.model,
                    summary: newProduct.summary,
                    condition: newProduct.condition,
                    category: newProduct.category
                }
            })
            .then(function(response) {
                console.log(response);
            });
        };

        // ***ADMIN LOGINS***
        this.adminLogin = function(user) {
            return $http({
                method: "POST",
                url: '/api/adminLogin',
                data: user
            })
            .then(function(response) {
                return response;
            });
        };

        this.getUser = function() {
            return $http({
                method: 'GET',
                url: 'api/me'
            })
            .then(function(response) {
                console.log(response);
                return response;
            });
        };

        this.logout = function() {
            return $http({
                method: 'GET',
                url: '/api/logout'
            })
            .then(function(response) {
                console.log(response);
                return response;
            });
        };

        this.getAdmins = function() {
            return $http({
                method: "GET",
                url: "/api/admin"
            })
            .then(function(response) {
                return response.data;
            });
        };

        this.addAdmin = function(newAdmin) {
            console.log(data);
            return $http({
                method: 'POST',
                url: '/api/admin',
                data: newAdmin
            })
            .then(function(response) {
                console.log("admin creating success", response);
                return response;
            });
        };

        this.updateAdmin = function(id, admin) {
            return $http({
                method: "PUT",
                url: "/api/admin/" + id,
                data: admin
            })
            .then(function(response) {
                console.log(response);
            });
        };

        this.deleteAdmin = function(id) {
            return $http({
                method: "DELETE",
                url: "/api/admin/" + id
            })
            .then(function(response) {
                console.log(response);
            });
        };

});
