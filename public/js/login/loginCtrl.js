angular.module("app")
    .controller("loginCtrl", function($scope, adminSvc, toaster) {

        $scope.adminLogin = function() {
            adminSvc.adminLogin($scope.credentials)
            .then(function(response) {
                console.log(response);
                if (response) {} else {
                    alert('Insufficient Admin Credentials');
                }
            });
        };
    });
