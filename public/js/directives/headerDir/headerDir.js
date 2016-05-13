angular.module("app")
    .directive("headerDir", function() {

        return {
            templateUrl: './js/directives/headerDir/headerDir.html',
            restrict: 'E'
        };

  });
