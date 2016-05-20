angular.module("app")
    .controller("adminCtrl", function($scope, adminSvc, $state, sessions) {

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
            $scope.product = " ";
        };

        $scope.deleteProduct = function(id, product) {
            if (confirm("Are you sure you want to delete the " + product + "?")) {
                adminSvc.destroyProduct(id);
                callGetProducts();
            }
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


        // $scope.adminLogin = function() {
        //     adminSvc.adminLogin($scope.credentials)
        //         .then(function(response) {
        //             if (response) {
        //                 $scope.adminUser = false;
        //                 $scope.adminLoginBoxes = true;
        //             } else {
        //                 alert('Insufficient Admin Credentials');
        //             }
        //         });
        // };

        var callGetAdmins = function() {
            adminSvc.getAdmins()
                .then(function(admins) {
                    $scope.admins = admins;
                });
        };
        callGetAdmins();

        $scope.logout = function() {
            adminSvc.logout();
        };

        $scope.addAdmin = function(admin) {
            adminSvc.addAdmin(admin);
            callGetAdmins();
            $scope.admin = " ";
        };

        $scope.updateAdmin = function(id, admin) {
            adminSvc.updateAdmin(id, admin);
            callGetAdmins();
        };

        $scope.deleteAdmin = function(id, name) {
            if (confirm("Are you sure you want to remove " + name + " from the admin list?")) {
                adminSvc.deleteAdmin(id);
                callGetAdmins();
            }
        };

        var callGetLessons = function() {
            adminSvc.getLessons()
                .then(function(lessons) {
                    $scope.lessons = lessons;
                });
        };
        callGetLessons();

        $scope.newLesson = function(lesson) {
            adminSvc.addLesson(lesson);
            callGetLessons();
            $scope.lesson = " ";
        };

        $scope.deleteLesson = function(lessonID, student) {
            if (confirm("Are you sure you want to delete lesson for " + student + "?")) {
                adminSvc.deleteLesson(lessonID);
                callGetLessons();
            }
        };

        $scope.updateLesson = function(id, lesson) {
            adminSvc.updateLesson(id, lesson);
            callGetLessons();
        };

        // *************************** calendar ****************
        events = [];
        $scope.eventSources = [events];
        var callGetStudioSessions = function() {
            adminSvc.getStudioSessions()
                .then(function(sessions) {
                    sessions.forEach(function(item) {
                        events.push({
                            title: item.lastName,
                            start: new Date(2016, item.date.month, item.date.day)
                        });
                    });
                    $scope.sessions = sessions;
                });

        };
        $scope.calOptions = {
            editable: true,
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            }
        };
        callGetStudioSessions();

        $scope.newStudioSession = function(session) {
            adminSvc.addStudioSession(session);
            callGetStudioSessions();
            $scope.studioSession = " ";
        };

        $scope.deleteStudioSession = function(id) {
            if (confirm("Are you sure you want to delete this Studio Session?")) {
                adminSvc.deleteStudioSession(id);
                callGetStudioSessions();
            }
        };

        $scope.updateStudioSession = function(id, session) {
            adminSvc.updateStudioSession(id, session);
            callGetStudioSessions();
        };
    });
