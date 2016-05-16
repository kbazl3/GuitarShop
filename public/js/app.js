angular.module("app", ['ui.router', 'ngMessages'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state("home", {
                url: '/',
                templateUrl: "./js/main/main.html",
                controller: "mainCtrl"
            })

        .state("admin", {
            url: '/admin',
            templateUrl: "./js/admin/admin.html",
            controller: "adminCtrl"
        })

        .state("splash", {
            url: '/splash',
            templateUrl: "./js/home/home.html",
            controller: "homeCtrl"
        })

        .state("services", {
            url: '/services',
            templateUrl: "./js/services/services.html",
            controller: "servicesCtrl"
        });

    });
