angular.module("app")
    .controller("adminCtrl", function($scope, adminSvc, toaster) {

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
        // ****** PRODUCTS CRUD *******
        $scope.addProduct = function(product) {
            console.log("from html to adminCtrl", product);
            adminSvc.addNewProduct(product);
            callGetProducts();
            toaster.pop('success', "Successfully Added New Product");
            $scope.product = "";
        };
        $scope.deleteProduct = function(id, product) {
            if (confirm("Are you sure you want to delete the " + product + "?")) {
                adminSvc.destroyProduct(id);
                toaster.pop('success', "Successfully Deleted Product");
                callGetProducts();
            }
        };
        $scope.updateProduct = function(id, product) {
            adminSvc.updateProduct(id, product);
            toaster.pop('success',"Successfully Updated Product");
            callGetProducts();
        };
        var callGetProducts = function() {
            adminSvc.getProducts()
                .then(function(products) {
                    $scope.products = products;
                });
        };
        callGetProducts();

        // ****** ADMINS CRUD *******
        $scope.logout = function() {
            adminSvc.logout();
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
            toaster.pop('success', "Successfully Added New Admin", "");
            $scope.admin = "";
        };
        $scope.updateAdmin = function(id, admin) {
            adminSvc.updateAdmin(id, admin);
            toaster.pop('success', "Successfully Updated Admin");
            callGetAdmins();
        };
        $scope.deleteAdmin = function(id, name) {
            if (confirm("Are you sure you want to remove " + name + " from the admin list?")) {
                adminSvc.deleteAdmin(id);
                toaster.pop('success', "Successfully Deleted " + name + " From Admin Database");
                callGetAdmins();
            }
        };

        // ****** LESSONS CRUD *******
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
            toaster.pop('success', "Success", "Successfully Added New Lesson");
            $scope.lesson = "";
        };
        $scope.deleteLesson = function(lessonID, student) {
            if (confirm("Are you sure you want to delete lesson for " + student + "?")) {
                adminSvc.deleteLesson(lessonID);
                toaster.pop('success', "Successfully Deleted Lesson");
                callGetLessons();
            }
        };
        $scope.updateLesson = function(id, lesson) {
            adminSvc.updateLesson(id, lesson);
            toaster.pop('success', "Successfully Updated Lesson");
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

        // ****** STUDIO SESSIONS CRUD *******
        callGetStudioSessions();
        $scope.newStudioSession = function(session) {
            adminSvc.addStudioSession(session);
            callGetStudioSessions();
            toaster.pop('success', "Success", "Successfully Added New Studio Session");
            $scope.studioSession = "";
        };
        $scope.deleteStudioSession = function(id) {
            console.log(id);
            if (confirm("Are you sure you want to delete this Studio Session?")) {
                adminSvc.deleteStudioSession(id);
                toaster.pop('success', "Successfully Deleted Studio Session");
                callGetStudioSessions();
            }
        };
        $scope.updateStudioSession = function(id, session) {
            adminSvc.updateStudioSession(id, session);
            toaster.pop('success', "Successfully Updated Studio Session");
            callGetStudioSessions();
        };
    });
