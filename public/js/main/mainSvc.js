angular.module("app")
    .service("mainSvc", function($http) {

        this.getProducts = function() {
            $http({
                method: "GET",
                url: "/api/products"
            })
            .then(function(response) {
                console.log(response);
                return response;
            });
        };



});
