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
            return $http({
                    method: 'POST',
                    url: '/api/admin',
                    data: newAdmin
                })
                .then(function(response) {
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

        this.getLessons = function() {
            return $http({
                method: 'GET',
                url: '/api/lessons'
            }).then(function(response) {
                return response.data;
            });
        };

        this.addLesson = function(lesson) {
            return $http({
                    method: 'POST',
                    url: '/api/lessons',
                    data: {
                        firstName: lesson.firstName,
                        lastName: lesson.lastName,
                        phone: lesson.phone,
                        email: lesson.email,
                        Instructor: lesson.instructor,
                        date: lesson.date,
                        detail: lesson.details
                    }
                })
                .then(function(response) {
                    return response;
                });
        };

        this.deleteLesson = function(id) {
            return $http({
                    method: "DELETE",
                    url: "/api/lessons/" + id
                })
                .then(function(response) {
                    console.log(response);
                });
        };

        this.updateLesson = function(id, lesson) {
            return $http({
                    method: "PUT",
                    url: "/api/lessons/" + id,
                    data: lesson
                })
                .then(function(response) {});
        };

        this.getStudioSessions = function() {
            return $http({
                method: 'GET',
                url: '/api/studioSessions'
            }).then(function(response) {
                return response.data;
            });
        };

        this.addStudioSession = function(session) {
            return $http({
                    method: "POST",
                    url: '/api/studioSessions',
                    data: {
                        firstName: session.firstName,
                        lastName: session.lastName,
                        phone: session.phone,
                        email: session.email,
                        Instructor: session.instructor,
                        date: session.date,
                        detail: session.details
                    }
                })
                .then(function(response) {
                    return response;
                });
        };

        this.deleteStudioSession = function(id) {
            return $http({
                    method: "DELETE",
                    url: "/api/studioSessions/" + id
                })
                .then(function(response) {
                    console.log(response);
                });
        };

        this.updateStudioSession = function(id, session) {
            return $http({
                    method: "PUT",
                    url: "/api/studioSessions/" + id,
                    data: session
                })
                .then(function(response) {});
        };

    });
