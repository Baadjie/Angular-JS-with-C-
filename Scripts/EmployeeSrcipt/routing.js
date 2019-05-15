
app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'view/login.html',
                controller: 'loginCtrl'
            })

            .when('/dashboard', {
                templateUrl: 'view/dashboard.html',
                controller: 'MainCtrl'/*'dashCtrl'*/
            })
            .when(
                '/viewTraining', {
                    controller: 'viewTrainingCntrl',
                    templateUrl: 'Pages/ProductTrainingInfo.html'
                })
            .when(
                '/outStanding', {
                    controller: 'outstandingCntrl',
                    templateUrl: 'Pages/outStandingTraining.html'
                })
            .when(
                '/viewProduct', {
                    controller: 'viewProductCntrl',
                    templateUrl: 'Pages/ViewProduct.html'
                })
            .when(
                '/updateTraining', {
                    controller: 'editTrainingCtrl',
                    templateUrl: 'Pages/UpdateTraining.html'
                })
            .when(
                '/addProduct', {
                    controller: 'addProductCntrl',
                    templateUrl: 'Pages/AddProduct.html'
                })
            .when(
                '/captureTraining', {
                    controller: 'addTrainingCntrl',
                    templateUrl: 'Pages/AddTrainingInfo.html'
                })

    }
]);	


//app.config(['$routeProvider', function ($routeProvider) {
//    $routeProvider
//        //.when(
//        //    '/login', {
//        //        controller: 'LoginController',
//        //        templateUrl: 'Login.html',
//        //})
//        .when(
//            '/home', {
//            controller: 'MainCtrl',
//                templateUrl: 'index.html',
//            })
//        .when(
//            '/viewEmployee', {
//                controller: 'viewEmpCntrl',
//                templateUrl: 'Pages/employeeDetails.html',
//            })
//        .when(
//            '/createEmployee', {
//                controller: 'myCntrl',
//                templateUrl: 'Pages/registEmployee.html'
//            })
//        .when(
//        '/updateEmployee', {
//            controller: 'editCtrl',
//                templateUrl: 'Pages/updateMasterEmployee.html'
//        })
//        .when(
//            '/captureTraining', {
//                controller: 'addTrainingCntrl',
//            templateUrl: 'Pages/AddTrainingInfo.html'
//        })
//        .when(
//            '/', {
//                controller: 'viewTrainingCntrl',
//            templateUrl: 'Pages/ProductTrainingInfo.html'
//            })
//        //.when(
//        //    '/updateTraining', {
//        //        controller: 'myCntrl',
//        //    templateUrl: 'Pages/UpdateTraining.html'
//        //})
//         .when(
//            '/updateTraining', {
//             controller: 'editTrainingCtrl',
//            templateUrl: 'Pages/UpdateTraining.html'
//        })
//        .when(
//            '/addProduct', {
//            controller: 'addProductCntrl',
//            templateUrl: 'Pages/AddProduct.html'
//        })
//        .when(
//            '/outStanding', {
//            controller: 'outstandingCntrl',
//            templateUrl: 'Pages/outStandingTraining.html'
//            })
//        .when(
//            '/viewProduct', {
//            controller: 'viewProductCntrl',
//            templateUrl: 'Pages/ViewProduct.html'
//            })
//        .when(
//            '/about', {
//                controller: 'about',
//                templateUrl: 'about.html'
//            })
//        .when(
//            '/contact', {
//                controller: 'contact',
//                templateUrl: '/pages/contactus.html'
//            })
//        //.when(
//        //    '/', {
//        //        controller: 'home',
//        //        templateUrl: 'TestData.html'
//        //    })
//        .otherwise('/');
//}]);