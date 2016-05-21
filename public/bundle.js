angular.module("app", ['ui.router', 'ngMessages', 'ui.calendar', 'ngAnimate', 'toaster', 'ngAudio'])
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state("products", {
                url: '/products',
                templateUrl: "./js/product/product.html",
                controller: "productCtrl"
            })

        .state("admin", {
            url: '/admin/:id',
            templateUrl: "./js/admin/admin.html",
            controller: "adminCtrl",
            resolve: {
                sessions: ["adminSvc", function(adminSvc) {
                    adminSvc.getStudioSessions();
                }]
            }
        })

        .state("home", {
            url: '/',
            templateUrl: "./js/home/home.html"
        })

        .state("login", {
            url: '/login',
            templateUrl: "./js/login/login.html",
            controller: "loginCtrl"
        })

        .state("lessons", {
            url: '/lessons',
            templateUrl: "./js/lessons/lessons.html"
        })

        .state("studio", {
            url: '/studio',
            templateUrl: "./js/studio/studio.html",
            controller: "studioCtrl"
        })

        .state("setup", {
            url: '/setup',
            templateUrl: "./js/setup/setup.html"
        });

    }]);

angular.module("app")
    .controller("adminCtrl", ["$scope", "adminSvc", "toaster", function($scope, adminSvc, toaster) {

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
        // ****** PRODUCTS CRUD *******
        $scope.addProduct = function(product) {
            adminSvc.addNewProduct(product);
            callGetProducts();
            toaster.pop('success', "Successfully Added New Product");
            $scope.product = "";
        };
        $scope.deleteProduct = function(id, product) {
            if (confirm("Are you sure you want to delete the " + product + "?")) {
                adminSvc.destroyProduct(id);
                toaster.pop('success', "Successfully Deleted Product");
                callGetProducts();
            }
        };
        $scope.updateProduct = function(id, product) {
            adminSvc.updateProduct(id, product);
            toaster.pop('success',"Successfully Updated Product");
            callGetProducts();
        };
        var callGetProducts = function() {
            adminSvc.getProducts()
                .then(function(products) {
                    $scope.products = products;
                });
        };
        callGetProducts();

        // ****** ADMINS CRUD *******
        $scope.logout = function() {
            adminSvc.logout();
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
            toaster.pop('success', "Successfully Added New Admin", "");
            $scope.admin = "";
        };
        $scope.updateAdmin = function(id, admin) {
            adminSvc.updateAdmin(id, admin);
            toaster.pop('success', "Successfully Updated Admin");
            callGetAdmins();
        };
        $scope.deleteAdmin = function(id, name) {
            if (confirm("Are you sure you want to remove " + name + " from the admin list?")) {
                adminSvc.deleteAdmin(id);
                toaster.pop('success', "Successfully Deleted " + name + " From Admin Database");
                callGetAdmins();
            }
        };

        // ****** LESSONS CRUD *******
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
            toaster.pop('success', "Success", "Successfully Added New Lesson");
            $scope.lesson = "";
        };
        $scope.deleteLesson = function(lessonID, student) {
            if (confirm("Are you sure you want to delete lesson for " + student + "?")) {
                adminSvc.deleteLesson(lessonID);
                toaster.pop('success', "Successfully Deleted Lesson");
                callGetLessons();
            }
        };
        $scope.updateLesson = function(id, lesson) {
            adminSvc.updateLesson(id, lesson);
            toaster.pop('success', "Successfully Updated Lesson");
            callGetLessons();
        };

        // *************************** calendar ****************
        events = [];
        $scope.eventSources = [events];
        var callGetStudioSessions = function() {
            adminSvc.getStudioSessions()
                .then(function(sessions) {
                    sessions.forEach(function(item) {
                        events.push({
                            title: item.lastName,
                            start: new Date(2016, item.date.month, item.date.day)
                        });
                    });
                    $scope.sessions = sessions;
                });
        };
        $scope.calOptions = {
            editable: true,
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            }
        };

        // ****** STUDIO SESSIONS CRUD *******
        callGetStudioSessions();
        $scope.newStudioSession = function(session) {
            adminSvc.addStudioSession(session);
            callGetStudioSessions();
            toaster.pop('success', "Success", "Successfully Added New Studio Session");
            $scope.studioSession = "";
        };
        $scope.deleteStudioSession = function(id) {
            console.log(id);
            if (confirm("Are you sure you want to delete this Studio Session?")) {
                adminSvc.deleteStudioSession(id);
                toaster.pop('success', "Successfully Deleted Studio Session");
                callGetStudioSessions();
            }
        };
        $scope.updateStudioSession = function(id, session) {
            adminSvc.updateStudioSession(id, session);
            toaster.pop('success', "Successfully Updated Studio Session");
            callGetStudioSessions();
        };
    }]);

angular.module("app")
    .service("adminSvc", ["$http", "$state", function($http, $state) {

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
            return $http({
                    method: "DELETE",
                    url: "/api/products/" + id
                })
                .then(function(response) {
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
                    $state.go('admin', {id: response.data._id});
                    return response;
                });
        };

        this.getUser = function() {
            return $http({
                    method: 'GET',
                    url: '/api/me'
                })
                .then(function(response) {
                    return response;
                });
        };

        this.logout = function() {
            return $http({
                    method: 'GET',
                    url: '/api/logout'
                })
                .then(function(response) {
                    $state.go('login')
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
                });
        };

        this.deleteAdmin = function(id) {
            return $http({
                    method: "DELETE",
                    url: "/api/admin/" + id
                })
                .then(function(response) {
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
    .controller("loginCtrl", ["$scope", "adminSvc", function($scope, adminSvc) {

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

}]);

angular.module("app")
    .controller("productCtrl", ["$scope", "adminSvc", function($scope, adminSvc) {

        adminSvc.getProducts()
            .then(function(products) {
                $scope.products = products;
            });
    }]);

angular.module("app")
    .controller("studioCtrl", ["$scope", "ngAudio", function($scope, ngAudio) {

        $scope.sound = ngAudio.load("../media/spice.mp3"); // returns NgAudioObject
        console.log($scope.sound);
        $scope.play = function() {
            $scope.sound.play();
        }
        $scope.stop = function() {
            $scope.sound.stop();
        }
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
