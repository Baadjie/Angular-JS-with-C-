app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});
//Date format
app.filter('mvcDate', ['$filter', $filter =>
    (date, format, timezone) =>
        date && $filter('date')(date.slice(6, -2), format, timezone)
]);

app.controller('MainCtrl', function ($scope, $location, myFactory) {
    $scope.page = 1;
    $scope.setpage = function (page) {
        $scope.page = page;
    }
    $scope.name = '';
    //$scope.emp = myFactory.get();
   //$location.path('/Index'); 
    $scope.navigation = true; // default visibility state

    $scope.showNavigation = function (show) {
        $scope.navigation = show;
    };

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


app.controller("viewEmpCntrl", function ($scope, $http, $location, myFactory, $filter, $rootScope, checkAuth) {

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

    //Paging in a table
    $scope.itemsPerPage = 6;
    $scope.currentPage = 0;


    $scope.range = function () {
        var rangeSize = 5;
        var ret = [];
        var start;

        start = $scope.currentPage;
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize + 1;
        }

        for (var i = start; i < start + rangeSize; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
        return Math.ceil($scope.EmployeeList.length / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.nextPageDisabled = function () {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function (n) {
        $scope.currentPage = n;
    };

    //Format date
    var date = new Date();
    $scope.dates = [{ Verified: date }]


    
    //EMPLOYEE DETAILS 

    //Insert new record e.g register new employee 
    $scope.SaveEmployeeInfo = function () {
        var httpreq = {
            method: 'POST',
            url: 'EmployeeService.asmx/Save',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { LastName: $scope.lastName, FirstName: $scope.firstName, IdentityNo: $scope.identityNo, DateOfBirth: $scope.dateOfBirth, DateOfAppointment: $scope.dateOfAppointment, Position: $scope.position, Department: $scope.department, Category: $scope.category, GradeNo: $scope.gradeNo, ExtensionNo: $scope.extensionNo, MobilePhone: $scope.mobilePhone, OldMobilePhone: $scope.oldMobilePhone, EmailAddress1: $scope.emailAddress1, ConsultantName: $scope.consultantName, ConsultantAKA: $scope.consultantAKA, TeamName: $scope.teamName, TeamLeader: $scope.teamLeader, TeamLeaderExtensionNo: $scope.teamLeaderExtensionNo, IDBadge: $scope.iDBadge, AccessLevel: $scope.accessLevel, UserName: $scope.userName/*, Password: $scope.Password, Roles,Password Spare1:$scope.spare1, Spare2:$scope.spare2, Spare3: $scope.spare3,Spare4:$scope.spare4*/ }
        }
        $http(httpreq).success(function (response) {
            alert("Saved successfully.");
        })
    };


    // populate data before you update
    $scope.fillMasterList = function () {
        var httpreq = {
            method: 'POST',
            url: 'EmployeeService.asmx/GetList',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        }
        $http(httpreq).success(function (response) {
            $scope.EmployeeList = response.d;
        })
    };
    $scope.fillMasterList();

    //$scope.Edit = function (response) {
    //    myFactory.set(response);
    //    $location.path('/EditData');
    //}

    $scope.EditEmp = function (d) {
        myFactory.set(d);
        $location.path('/updateEmployee');
    }

    //Edit method that parse data to textbox in order to update specific data

    $scope.editEmployee = function (employee) {
        $scope.EmployeeList.Id = employee.EmployeeID;
        $scope.EmployeeList.lastName = employee.LastName;
        $scope.EmployeeList.firstName = employee.FirstName;
        $scope.EmployeeList.identityNo = employee.IdentityNo;
        $scope.EmployeeList.dateOfBirth = employee.DateOfBirth;
        $scope.EmployeeList.dateOfAppointment = employee.DateOfAppointment;
        //$scope.EmployeeList.status1 = employee.Status1;
        //$scope.EmployeeList.subStatus = employee.SubStatus;
        $scope.EmployeeList.position = employee.Position;
        $scope.EmployeeList.department = employee.Department;
        $scope.EmployeeList.category = employee.Category;
        $scope.EmployeeList.gradeNo = employee.GradeNo;
        $scope.EmployeeList.extensionNo = employee.ExtensionNo;
        $scope.EmployeeList.mobilePhone = employee.MobilePhone;
        $scope.EmployeeList.oldMobilePhone = employee.OldMobilePhone;
        $scope.EmployeeList.emailAddress1 = employee.EmailAddress1;
        $scope.EmployeeList.consultantName = employee.ConsultantName;
        $scope.EmployeeList.consultantAKA = employee.ConsultantAKA;
        $scope.EmployeeList.teamName = employee.TeamName;
        $scope.EmployeeList.teamLeader = employee.TeamLeader;
        $scope.EmployeeList.teamLeaderExtensionNo = employee.TeamLeaderExtensionNo;
        $scope.EmployeeList.iDBadge = employee.IDBadge;
        $scope.EmployeeList.accessLevel = employee.AccessLevel;
        //$scope.EmployeeList.logDate = employee.LogDate;
        $scope.EmployeeList.userName = employee.UserName;
    };

    //$scope.myDate = new Date($scope.EmployeeList.dateOfBirth);
    //var json = {
    //    DateOfBirth: $scope.EmployeeList.dateOfBirth
    //};
    //var date = new Date(json.DateOfBirth);
    //$scope.date = $filter('date')(date, "yyyy-MM-dd");


    //Update
    $scope.Edit = function () {
        if (confirm("Are you sure want to update?")) {
            var httpreq = {
                method: 'POST',
                url: 'EmployeeService.asmx/EditEmpDetails',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'dataType': 'json'
                },
                data: { EmployeeID: $scope.EmployeeList.Id, LastName: $scope.EmployeeList.lastName, FirstName: $scope.EmployeeList.firstName, IdentityNo: $scope.EmployeeList.identityNo, DateOfBirth: $scope.EmployeeList.dateOfBirth, DateOfAppointment: $scope.EmployeeList.dateOfAppointment, Position: $scope.EmployeeList.position, Department: $scope.EmployeeList.department, Category: $scope.EmployeeList.category, GradeNo: $scope.EmployeeList.gradeNo, ExtensionNo: $scope.EmployeeList.extensionNo, MobilePhone: $scope.EmployeeList.mobilePhone, OldMobilePhone: $scope.EmployeeList.oldMobilePhone, EmailAddress1: $scope.EmployeeList.emailAddress1, ConsultantName: $scope.EmployeeList.consultantName, ConsultantAKA: $scope.EmployeeList.consultantAKA, TeamName: $scope.EmployeeList.teamName, TeamLeader: $scope.EmployeeList.teamLeader, TeamLeaderExtensionNo: $scope.EmployeeList.teamLeaderExtensionNo, IDBadge: $scope.EmployeeList.iDBadge, AccessLevel: $scope.EmployeeList.accessLevel, UserName: $scope.EmployeeList.userName/*, Spare1:$scope.EmployeeList.spare1, Spare2:$scope.EmployeeList.spare2, Spare3: $scope.EmployeeList.spare3,Spare4:$scope.EmployeeList.spare4*/ }
            }
            $http(httpreq).success(function (response) {
                alert("Update successfully.");
            })
        }
    };


    //Remove employee from database
    $scope.Delete = function (SID) {
        if (confirm("Are you sure want to delete?")) {
            var httpreq = {
                method: 'POST',
                url: 'EmployeeService.asmx/RemoveEmp',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'dataType': 'json'
                },
                data: { EmployeeID: SID }
            }
            $http(httpreq).success(function (response) {
                alert("Deleted successfully.");
            })
        }
    };


});

app.controller("editCtrl", function ($scope, $location, myFactory, $rootScope, checkAuth) {

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

    $scope.emp = myFactory.get();
   // $scope.emp.Id = EmployeeID;
   // //$scope.emp.LastName = lastName;
   // $scope.emp.firstName = FirstName;
   // $scope.emp.identityNo = IdentityNo;
   // $scope.emp.dateOfBirth = DateOfBirth;
   // $scope.emp.dateOfAppointment = DateOfAppointment;
   ////$scope.EmployeeList.status1 = employee.Status1;
   ////$scope.EmployeeList.subStatus = employee.SubStatus;
   // $scope.emp.position = Position;
   // $scope.emp.department = Department;
   // $scope.emp.category = Category;
   // $scope.emp.gradeNo = GradeNo;
   // $scope.emp.extensionNo = ExtensionNo;
   // $scope.emp.mobilePhone = MobilePhone;
   // $scope.emp.oldMobilePhone = OldMobilePhone;
   // $scope.emp.emailAddress1 = EmailAddress1;
   // $scope.emp.consultantName = ConsultantName;
   // $scope.emp.consultantAKA = ConsultantAKA;
   // $scope.emp.teamName = TeamName;
   // $scope.empt.teamLeader = TeamLeader;
   // $scope.emp.teamLeaderExtensionNo = TeamLeaderExtensionNo;
   // $scope.emp.iDBadge = IDBadge;
   // $scope.emp.accessLevel = AccessLevel;
   // //$scope.EmployeeList.logDate = employee.LogDate;
   // $scope.emp.userName = UserName

    // Update
    $scope.UpdateData = function () {
        if (confirm("Are you sure want to update?")) {
            var httpreq = {
                method: 'POST',
                url: 'EmployeeService.asmx/EditEmpDetails',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'dataType': 'json'
                },
               data: { EmployeeID: $scope.emp.Id, LastName: $scope.emp.LastName, FirstName: $scope.emp.FirstName, IdentityNo: $scope.emp.IdentityNo, DateOfBirth: $scope.emp.DateOfBirth, DateOfAppointment: $scope.emp.DateOfAppointment, Position: $scope.emp.Position, Department: $scope.emp.Department, Category: $scope.emp.Category, GradeNo: $scope.emp.GradeNo, ExtensionNo: $scope.emp.ExtensionNo, MobilePhone: $scope.emp.MobilePhone, OldMobilePhone: $scope.emp.OldMobilePhone, EmailAddress1: $scope.emp.EmailAddress1, ConsultantName: $scope.emp.ConsultantName, ConsultantAKA: $scope.emp.ConsultantAKA, TeamName: $scope.emp.TeamName, TeamLeader: $scope.emp.TeamLeader, TeamLeaderExtensionNo: $scope.emp.TeamLeaderExtensionNo, IDBadge: $scope.emp.IDBadge, AccessLevel: $scope.emp.AccessLevel, UserName: $scope.emp.UserName/*, Spare1:$scope.EmployeeList.spare1, Spare2:$scope.EmployeeList.spare2, Spare3: $scope.EmployeeList.spare3,Spare4:$scope.EmployeeList.spare4*/ }
                //data: { EmployeeID: $scope.Id, LastName: $scope.lastName, FirstName: $scope.firstName, IdentityNo: $scope.identityNo, DateOfBirth: $scope.dateOfBirth, DateOfAppointment: $scope.dateOfAppointment, Position: $scope.position, Department: $scope.department, Category: $scope.category, GradeNo: $scope.gradeNo, ExtensionNo: $scope.extensionNo, MobilePhone: $scope.mobilePhone, OldMobilePhone: $scope.oldMobilePhone, EmailAddress1: $scope.emailAddress1, ConsultantName: $scope.consultantName, ConsultantAKA: $scope.consultantAKA, TeamName: $scope.teamName, TeamLeader: $scope.teamLeader, TeamLeaderExtensionNo: $scope.teamLeaderExtensionNo, IDBadge: $scope.iDBadge, AccessLevel: $scope.accessLevel, UserName: $scope.userName/*, Spare1:$scope.EmployeeList.spare1, Spare2:$scope.EmployeeList.spare2, Spare3: $scope.EmployeeList.spare3,Spare4:$scope.EmployeeList.spare4*/ }
            }
            $http(httpreq).success(function (response) {
                alert("Update successfully.");
            })
        }
    };

    //$scope.UpdateData = function () {
    //    if (confirm("Are you sure want to update?")) {
    //        var httpreq = {
    //            method: 'POST',
    //            url: 'EmployeeService.asmx/EditEmpDetails',

    //            headers: {
    //                'Content-Type': 'application/json; charset=utf-8',
    //                'dataType': 'json'
    //            },
    //            data: { EmployeeID: $scope.EmployeeList.Id, LastName: $scope.EmployeeList.lastName, FirstName: $scope.EmployeeList.firstName, IdentityNo: $scope.EmployeeList.identityNo, DateOfBirth: $scope.EmployeeList.dateOfBirth, DateOfAppointment: $scope.EmployeeList.dateOfAppointment, Position: $scope.EmployeeList.position, Department: $scope.EmployeeList.department, Category: $scope.EmployeeList.category, GradeNo: $scope.EmployeeList.gradeNo, ExtensionNo: $scope.EmployeeList.extensionNo, MobilePhone: $scope.EmployeeList.mobilePhone, OldMobilePhone: $scope.EmployeeList.oldMobilePhone, EmailAddress1: $scope.EmployeeList.emailAddress1, ConsultantName: $scope.EmployeeList.consultantName, ConsultantAKA: $scope.EmployeeList.consultantAKA, TeamName: $scope.EmployeeList.teamName, TeamLeader: $scope.EmployeeList.teamLeader, TeamLeaderExtensionNo: $scope.EmployeeList.teamLeaderExtensionNo, IDBadge: $scope.EmployeeList.iDBadge, AccessLevel: $scope.EmployeeList.accessLevel, UserName: $scope.EmployeeList.userName/*, Spare1:$scope.EmployeeList.spare1, Spare2:$scope.EmployeeList.spare2, Spare3: $scope.EmployeeList.spare3,Spare4:$scope.EmployeeList.spare4*/ }
    //        }
    //        $http(httpreq).success(function (response) {
    //            alert("Update successfully.");
    //        })
    //    }
    //};


    $scope.Back = function () {
        $location.path('/details');
    };
});