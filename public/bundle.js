angular.module("app", ['ui.router', 'ngMessages', 'ui.calendar'])
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state("products", {
                url: '/products',
                templateUrl: "./js/product/product.html",
                controller: "productCtrl"
            })

            .state("admin", {
                url: '/admin',
                templateUrl: "./js/admin/admin.html",
                controller: "adminCtrl"
            })

            .state("home", {
                url: '/',
                templateUrl: "./js/home/home.html",
                controller: "homeCtrl"
            })

            .state("lessons", {
                url: '/lessons',
                templateUrl: "./js/lessons/lessons.html"
            })

            .state("studio", {
                url: '/studio',
                templateUrl: "./js/studio/studio.html"
            })

            .state("setup", {
                url: '/setup',
                templateUrl: "./js/setup/setup.html"
            });

    }]);

angular.module("app")
    .controller("adminCtrl", ["$scope", "adminSvc", "$state", function($scope, adminSvc, $state) {

        $scope.adminUser = true;
        $scope.manageProducts = true;
        $scope.manageAdmins = true;
        $scope.lessonsAppointment = true;
        $scope.recordingSessionAppointment = true;

        $scope.toggleManageProducts = function() {
            $scope.manageProducts = !$scope.manageProducts;
        };

        $scope.toggleManageStudio = function() {
            $scope.recordingSessionAppointment = !$scope.recordingSessionAppointment;
        };

        $scope.toggleManageAdmins = function() {
            $scope.manageAdmins = !$scope.manageAdmins;
        };

        $scope.toggleLessonsAppointment = function() {
            $scope.lessonsAppointment = !$scope.lessonsAppointment;
        };

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
                    if (response) {
                        $scope.adminUser = false;
                        $scope.adminLoginBoxes = true;
                    } else {
                        alert('Insufficient Admin Credentials');
                    }
                });
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

        var callGetLessons = function() {
            adminSvc.getLessons()
                .then(function(lessons) {
                    $scope.lessons = lessons;
                });
        };
        callGetLessons();

        $scope.newLesson = function(lesson) {
            adminSvc.addLesson(lesson);
            callGetLessons();
        };

        $scope.deleteLesson = function(lessonID) {
            adminSvc.deleteLesson(lessonID);
            callGetLessons();
        };

        $scope.updateLesson = function(id, lesson) {
            adminSvc.updateLesson(id, lesson);
            callGetLessons();
        };

        var events = [];
        var callGetStudioSessions = function() {
            adminSvc.getStudioSessions()
                .then(function(sessions) {
                    console.log(sessions);
                    sessions.forEach(function(item) {
                        events.push({title: item.lastName, start: new Date(2016, 4, parseInt(item.date.day))});
                    });
                    console.log(events);
                    $scope.sessions = sessions;
                });
        };
        callGetStudioSessions();

        $scope.newStudioSession = function(session) {
            adminSvc.addStudioSession(session);
            callGetStudioSessions();
            $scope.studioSession = " ";
        };

        $scope.deleteStudioSession = function(id) {
            adminSvc.deleteStudioSession(id);
            callGetStudioSessions();
        };

        $scope.updateStudioSession = function(id, session) {
            adminSvc.updateStudioSession(id, session);
            callGetStudioSessions();
        };

        // *************************** calendar ****************
        // var events = [
        //     {title: "Mom's Birthday", start: new Date(2016, 4, 25 11:13:00)},
        //     {title: "Party Time", start: new Date(2016, 4, 12), end: new Date(2016, 4, 16)}
        // ];

        $scope.eventSources = [events];

        $scope. calOptions = {
            editable: true,
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            }
        };


    }]);

angular.module("app")
    .service("adminSvc", ["$http", function($http) {

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

    }]);

angular.module("app")
    .controller("homeCtrl", ["$scope", function($scope) {

}]);

angular.module("app")
    .controller("productCtrl", ["$scope", "adminSvc", function($scope, adminSvc) {

        adminSvc.getProducts()
            .then(function(products) {
                $scope.products = products;
            });
    }]);

angular.module("app")
    .service("mainSvc", ["$http", function($http) {

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
    }]);

angular.module("app")
    .directive("footerDir", function() {

        return {
            templateUrl: './js/directives/footerDir/footerDir.html',
            restrict: 'E'
        };
    });

angular.module("app")
    .directive("headerDir", function() {

        return {
            templateUrl: './js/directives/headerDir/headerDir.html',
            restrict: 'E'
        };

    });
