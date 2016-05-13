angular.module("app", ['ui.router'])
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

            .state("services", {
                url: '/services',
                templateUrl: "./js/services/services.html"
            });

    });
