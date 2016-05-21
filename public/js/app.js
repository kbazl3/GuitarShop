angular.module("app", ['ui.router', 'ngMessages', 'ui.calendar', 'ngAnimate', 'toaster'])
    .config(function($stateProvider, $urlRouterProvider) {

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
                sessions: function(adminSvc) {
                    adminSvc.getStudioSessions();
                }
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
            templateUrl: "./js/studio/studio.html"
        })

        .state("setup", {
            url: '/setup',
            templateUrl: "./js/setup/setup.html"
        });

    });
