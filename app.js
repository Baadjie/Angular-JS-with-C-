//var app = angular.module('loginApp',['ngRoute']);


app.config([ '$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {   
        $routeProvider

            .when('/', {
                templateUrl: 'view/login.html',
                controller: 'loginCtrl'
            })

            //.when('/dashboard', {
            //    templateUrl: 'view/dashboard.html',
            //    controller: 'MainCtrl'/*'dashCtrl'*/
            //})
            .when(
                '/viewTraining', {
                    controller: 'viewTrainingCntrl',
                    templateUrl: 'Pages/ProductTrainingInfo.html'
                })
            .when(
                '/viewUserTraining', {
                    controller: 'viewTrainingCntrl',
                    templateUrl: 'Pages/viewProductTraining.html'
                })
            .when(
                '/outStanding', {
                    controller: 'outstandingCntrl',
                    templateUrl: 'Pages/outStandingTraining.html'
                })
            .when(
                '/currentUserOutStanding', {
                    controller: 'outstandingCntrl',
                    templateUrl: 'Pages/currentUserOutstanding.html'
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

/* Create factory to Disable Browser Back Button only after Logout */
app.factory("checkAuth", function($location,$rootScope){
    return {
        getuserInfo : function(){
			if($rootScope.isLoggedIn === undefined || $rootScope.isLoggedIn === null){
				$location.path('/');
			}
		}
    };
});

app.controller('loginCtrl', function ($scope,$http,$location,$rootScope,$sce){
		$rootScope.isLoggedIn = false;
    $scope.login = function () {	
        var httpreq = {
            method: 'POST',
            url: 'Login.asmx/LoginUser',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        }
        $http(httpreq).success(function (data) {


            for (var i = 0; i < data.d.length; i++) {
                User = data.d[i].Username;
                Password = data.d[i].Password;
                Role = data.d[i].Roles;
                a = (User);
                b = (Password);

				if ($scope.loginform.$valid) {
                    if ($scope.email == a && $scope.pass == b && Role == 'Admin')
					{
						//alert('login successful');
						$rootScope.isLoggedIn = true;
						$scope.UserId = $scope.email;
						$scope.session = $scope.email;
						$scope.sessionName = a;
						window.localStorage.setItem("SessionId", $scope.session);
						window.localStorage.setItem("SessionName", $scope.sessionName);
						window.localStorage.setItem("isLoggedIn", $scope.isLoggedIn);
						
						//userDetails.SessionId = $scope.session;
					
                        $location.path('/viewTraining');
                    }
                   else if ($scope.email == a && $scope.pass == b && Role == 'User') {
                        //alert('login successful');
                        $rootScope.isLoggedIn = true;
                        $scope.UserId = $scope.email;
                        $scope.session = $scope.email;
                        $scope.sessionName = a;
                        window.localStorage.setItem("SessionId", $scope.session);
                        window.localStorage.setItem("SessionName", $scope.sessionName);
                        window.localStorage.setItem("isLoggedIn", $scope.isLoggedIn);

                        //userDetails.SessionId = $scope.session;
                        
                        $location.path('/viewUserTraining');
                    }
                    else {
                       
						$rootScope.isLoggedIn = false;
						window.localStorage.setItem("isLoggedIn", $rootScope.isLoggedIn);
						$scope.loginMessage = $sce.trustAsHtml('<i class="fa fa-exclamation-triangle"></i> check your username and password');
                        console.log($scope.loginMessage);
                       // alert('check whether your email address or password is correct');
					}
				}
             }

           })

        } 
		
	});
	
app.controller('MainCtrl', function($scope,$location,$rootScope,$http,checkAuth){		
        $scope.page = 1;
        $scope.setpage = function (page) {
            $scope.page = page;
        }
        $scope.name = '';

		$rootScope.session = window.localStorage.getItem("SessionId");
		$rootScope.userName = window.localStorage.getItem("SessionName");
		$rootScope.isLoggedIn = window.localStorage.getItem("isLoggedIn");
		
		// Call checkAuth factory for cheking login details
		$scope.check = checkAuth.getuserInfo();
		
		$scope.logout = function () {
				window.localStorage.clear();
				$rootScope.isLoggedIn = false;
				$location.path("/");
		};
		
	});