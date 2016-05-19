angular.module("app")
    .controller("adminCtrl", function($scope, adminSvc, $state, sessions) {
        console.log("sessions", sessions);

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
        callGetLessons();

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

        // *************************** calendar ****************

        var obj = {
            year: 2016,
            month: 4,
            day: 3
        };

        // var events = [{
        //     title: "Mom's Birthday",
        //     start: new Date(obj.year, obj.month, obj.day)
        // }, {
        //     title: "Party Time",
        //     start: new Date(2016, 4, 12),
        //     end: new Date(2016, 4, 16)
        // }, {
        //     title: "Mom's Birthday",
        //     start: new Date(obj.year, obj.month, obj.day)
        // }];
        // console.log("events", events);

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



        // $scope.eventSources = [events];
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
            adminSvc.deleteStudioSession(id);
            callGetStudioSessions();
        };

        $scope.updateStudioSession = function(id, session) {
            adminSvc.updateStudioSession(id, session);
            callGetStudioSessions();
        };





    });
