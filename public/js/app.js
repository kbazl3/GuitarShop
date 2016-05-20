angular.module("app", ['ui.router', 'ngMessages', 'ui.calendar', 'ngAnimate'])
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
                    adminSvc.getStudioSessions()
                        .then(function(sessions) {
                            var events = [];
                            console.log(sessions);
                            sessions.forEach(function(item) {
                                events.push({
                                    title: item.lastName + ": " + item.details,
                                    start: new Date()
                                });
                            });
                            return events;
                        });
                }
            }
        })

        .state("home", {
            url: '/',
            templateUrl: "./js/home/home.html",
            controller: "homeCtrl"
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
