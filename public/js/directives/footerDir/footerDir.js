angular.module("app")
    .directive("footerDir", function() {

        return {
            templateUrl: './js/directives/footerDir/footerDir.html',
            restrict: 'E'
        };
    });
