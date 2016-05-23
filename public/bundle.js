angular.module("app",["ui.router","ngMessages","ui.calendar","ngAnimate","toaster"]).config(["$stateProvider","$urlRouterProvider",function(t,e){e.otherwise("/"),t.state("products",{url:"/products",templateUrl:"./js/product/product.html",controller:"productCtrl"}).state("admin",{url:"/admin/:id",templateUrl:"./js/admin/admin.html",controller:"adminCtrl",resolve:{sessions:["adminSvc",function(t){t.getStudioSessions()}]}}).state("home",{url:"/",templateUrl:"./js/home/home.html"}).state("login",{url:"/login",templateUrl:"./js/login/login.html",controller:"loginCtrl"}).state("lessons",{url:"/lessons",templateUrl:"./js/lessons/lessons.html"}).state("studio",{url:"/studio",templateUrl:"./js/studio/studio.html"}).state("setup",{url:"/setup",templateUrl:"./js/setup/setup.html"})}]);
angular.module("app").controller("adminCtrl",["$scope","adminSvc","toaster",function(e,s,n){e.adminUser=!0,e.manageProducts=!0,e.manageAdmins=!0,e.lessonsAppointment=!0,e.recordingSessionAppointment=!0,e.toggleManageProducts=function(){e.manageProducts=!e.manageProducts},e.toggleManageStudio=function(){e.recordingSessionAppointment=!e.recordingSessionAppointment},e.toggleManageAdmins=function(){e.manageAdmins=!e.manageAdmins},e.toggleLessonsAppointment=function(){e.lessonsAppointment=!e.lessonsAppointment},e.addNewProduct=function(n){alert("hitting this shit"),console.log("from html to adminCtrl",n),s.addNewProduct(n),e.product=""},e.createProduct=function(e){alert("hitting this"),console.log(e),s.addNewProduct(e)},e.alertz=function(){alert("mofucker")},e.deleteProduct=function(e,o){confirm("Are you sure you want to delete the "+o+"?")&&(s.destroyProduct(e),n.pop("success","Successfully Deleted Product"),t())},e.updateProduct=function(e,o){s.updateProduct(e,o),n.pop("success","Successfully Updated Product"),t()};var t=function(){s.getProducts().then(function(s){e.products=s})};t(),e.logout=function(){s.logout()};var o=function(){s.getAdmins().then(function(s){e.admins=s})};o(),e.addAdmin=function(t){s.addAdmin(t),o(),n.pop("success","Successfully Added New Admin",""),e.admin=""},e.updateAdmin=function(e,t){s.updateAdmin(e,t),n.pop("success","Successfully Updated Admin"),o()},e.deleteAdmin=function(e,t){confirm("Are you sure you want to remove "+t+" from the admin list?")&&(s.deleteAdmin(e),n.pop("success","Successfully Deleted "+t+" From Admin Database"),o())};var u=function(){s.getLessons().then(function(s){e.lessons=s})};u(),e.newLesson=function(t){s.addLesson(t),u(),n.pop("success","Success","Successfully Added New Lesson"),e.lesson=""},e.deleteLesson=function(e,t){confirm("Are you sure you want to delete lesson for "+t+"?")&&(s.deleteLesson(e),n.pop("success","Successfully Deleted Lesson"),u())},e.updateLesson=function(e,t){s.updateLesson(e,t),n.pop("success","Successfully Updated Lesson"),u()},events=[],e.eventSources=[events];var d=function(){s.getStudioSessions().then(function(s){s.forEach(function(e){events.push({title:e.lastName,start:new Date(2016,e.date.month,e.date.day)})}),e.sessions=s})};e.calOptions={editable:!0,header:{left:"prev",center:"title",right:"next"}},d(),e.newStudioSession=function(t){s.addStudioSession(t),d(),n.pop("success","Success","Successfully Added New Studio Session"),e.studioSession=""},e.deleteStudioSession=function(e){console.log(e),confirm("Are you sure you want to delete this Studio Session?")&&(s.deleteStudioSession(e),n.pop("success","Successfully Deleted Studio Session"),d())},e.updateStudioSession=function(e,t){s.updateStudioSession(e,t),n.pop("success","Successfully Updated Studio Session"),d()}}]);
angular.module("app").service("adminSvc",["$http","$state",function(t,n){this.getProducts=function(){return t({method:"GET",url:"/api/products"}).then(function(t){return t.data})},this.addNewProduct=function(n){return console.log("from adminCtrl to admin Svc",n),t({method:"POST",url:"/api/products",data:{make:n.make,price:n.price,image:n.image,model:n.model,summary:n.summary,condition:n.condition,category:n.category}}).then(function(t){return t})},this.destroyProduct=function(n){return t({method:"DELETE",url:"/api/products/"+n}).then(function(t){})},this.updateProduct=function(n,e){return t({method:"PUT",url:"/api/products/"+n,data:{make:e.make,price:e.price,image:e.image,model:e.model,summary:e.summary,condition:e.condition,category:e.category}}).then(function(t){})},this.adminLogin=function(e){return t({method:"POST",url:"/api/adminLogin",data:e}).then(function(t){return n.go("admin",{id:t.data._id}),t})},this.getUser=function(){return t({method:"GET",url:"/api/me"}).then(function(t){return t})},this.logout=function(){return t({method:"GET",url:"/api/logout"}).then(function(t){return n.go("login"),t})},this.getAdmins=function(){return t({method:"GET",url:"/api/admin"}).then(function(t){return t.data})},this.addAdmin=function(n){return t({method:"POST",url:"/api/admin",data:n}).then(function(t){return t})},this.updateAdmin=function(n,e){return t({method:"PUT",url:"/api/admin/"+n,data:e}).then(function(t){})},this.deleteAdmin=function(n){return t({method:"DELETE",url:"/api/admin/"+n}).then(function(t){})},this.getLessons=function(){return t({method:"GET",url:"/api/lessons"}).then(function(t){return t.data})},this.addLesson=function(n){return t({method:"POST",url:"/api/lessons",data:{firstName:n.firstName,lastName:n.lastName,phone:n.phone,email:n.email,Instructor:n.instructor,date:n.date,detail:n.details}}).then(function(t){return t})},this.deleteLesson=function(n){return t({method:"DELETE",url:"/api/lessons/"+n}).then(function(t){})},this.updateLesson=function(n,e){return t({method:"PUT",url:"/api/lessons/"+n,data:e}).then(function(t){})},this.getStudioSessions=function(){return t({method:"GET",url:"/api/studioSessions"}).then(function(t){return t.data})},this.addStudioSession=function(n){return t({method:"POST",url:"/api/studioSessions",data:{firstName:n.firstName,lastName:n.lastName,phone:n.phone,email:n.email,Instructor:n.instructor,date:n.date,detail:n.details}}).then(function(t){return t})},this.deleteStudioSession=function(n){return t({method:"DELETE",url:"/api/studioSessions/"+n}).then(function(t){})},this.updateStudioSession=function(n,e){return t({method:"PUT",url:"/api/studioSessions/"+n,data:e}).then(function(t){})}}]);
angular.module("app").controller("loginCtrl",["$scope","adminSvc","toaster",function(n,i,o){n.adminLogin=function(){i.adminLogin(n.credentials).then(function(n){console.log(n),n||alert("Insufficient Admin Credentials")})}}]);
angular.module("app").controller("productCtrl",["$scope","adminSvc",function(o,t){t.getProducts().then(function(t){o.products=t})}]);
angular.module("app").directive("footerDir",function(){return{templateUrl:"./js/directives/footerDir/footerDir.html",restrict:"E"}});
angular.module("app").directive("headerDir",function(){return{templateUrl:"./js/directives/headerDir/headerDir.html",restrict:"E"}});