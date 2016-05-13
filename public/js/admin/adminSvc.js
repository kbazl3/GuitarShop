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

        this.addNewProduct = function(make, price, img, model, summary, condition) {
            return $http({
                method: "POST",
                url: '/api/products',
                data: {
                    make: make,
                    price: price,
                    image: img,
                    model: model,
                    summary: summary,
                    condition: condition
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

        this.updateProduct = function(id, name, price, img) {
            return $http({
                method: "PUT",
                url: "/api/products/" + id,
                data: {
                    name: name,
                    price: price,
                    img: img,
                    description: prodDetails
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

});
