angular.module("app")
    .controller("adminCtrl", function($scope, adminSvc, $state) {

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

        $scope.addProduct = function(product) {
            adminSvc.addNewProduct(product);
            callGetProducts();
        };

        $scope.deleteProduct = function(id) {
            adminSvc.destroyProduct(id);
            callGetProducts();
        };

        $scope.updateProduct = function(id, name, price, img, model, summary, condition, type) {
            adminSvc.updateProduct(id, name, price, img, model, summary, condition, type);
            callGetProducts();
        };

        var callGetProducts = function() {
            adminSvc.getProducts()
                .then(function(products) {
                    $scope.products = products;
                });
        };
        callGetProducts();


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
        };

        $scope.updateAdmin = function(id, admin) {
            adminSvc.updateAdmin(id, admin);
            callGetAdmins();
        };

        $scope.deleteAdmin = function(id) {
            adminSvc.deleteAdmin(id);
            callGetAdmins();
        };

        var callGetLessons = function() {
            adminSvc.getLessons()
                .then(function(lessons) {
                    $scope.lessons = lessons;
                });
        };
        callGetLessons()

        $scope.newLesson = function(lesson) {
            adminSvc.addLesson(lesson);
            callGetLessons();
        };

        $scope.deleteLesson = function(lessonID) {
            adminSvc.deleteLesson(lessonID);
            callGetLessons();
        };

        $scope.updateLesson = function(id, lesson) {
            adminSvc.updateLesson(id, lesson);
            callGetLessons();
        };

        var callGetStudioSessions = function() {
            adminSvc.getStudioSessions()
                .then(function(sessions) {
                    $scope.sessions = sessions;
                });
        };
        callGetStudioSessions();

        $scope.newStudioSession = function(session) {
            adminSvc.addStudioSession(session);
            callGetStudioSessions();
            $scope.studioSession = " ";
        };

        $scope.deleteStudioSession = function(id) {
            adminSvc.deleteStudioSession(id);
            callGetStudioSessions();
        }

        $scope.updateStudioSession = function(id, session) {
            adminSvc.updateStudioSession(id, session);
            callGetStudioSessions();
        }


    });
