angular.module("app", ['ui.router', 'ngMessages'])
    .config(function($stateProvider, $urlRouterProvider) {

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

    });
