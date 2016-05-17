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

            .state("services", {
                url: '/services',
                templateUrl: "./js/services/services.html",
                controller: "servicesCtrl"
            })

            .state("lessons", {
                url: '/lessons',
                templateUrl: "./js/lessons/lessons.html",
                controller: "servicesCtrl"
            })

            .state("studio", {
                url: '/studio',
                templateUrl: "./js/studio/studio.html",
                controller: "servicesCtrl"
            })

            .state("setup", {
                url: '/setup',
                templateUrl: "./js/setup/setup.html"
            });

    });
