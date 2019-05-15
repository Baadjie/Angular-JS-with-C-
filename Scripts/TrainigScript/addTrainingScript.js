//save 
//var app = angular.module("myApp", []);

app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});


app.controller("addTrainingCntrl", function ($scope, $http, $location, $rootScope, checkAuth) {
    $scope.comment = "";


    $scope.fileName = "";
    $scope.fileName = "";
    $rootScope.session = window.localStorage.getItem("SessionId");
    $rootScope.userName = window.localStorage.getItem("SessionName");
    $rootScope.isLoggedIn = window.localStorage.getItem("isLoggedIn");

    $scope.LogUserId = $rootScope.userName = window.localStorage.getItem("SessionName");

    // Call checkAuth factory for cheking login details
    $scope.check = checkAuth.getuserInfo();

    $scope.logout = function () {
        window.localStorage.clear();
        $rootScope.isLoggedIn = false;
        $location.path("/");
    };


    $scope.studentorder = "StudetnID";
    $scope.Emp = "";
    $scope.Prod = "";


    //$scope.Save = function () {
    //    var httpreq = {
    //        method: 'POST',
    //        url: 'http://XINIXSERVER/XINIX_TrainingX/TrainingService.asmx/Save',
    //        headers: {
    //            'Content-Type': 'application/json; charset=utf-8',
    //            'dataType': 'json'
    //        },
    //        data: { EmployeeID: $scope.empID, ProductId: $scope.prodId, DateCompleted: $scope.completed, VerifiedDate: $scope.verified, TrainingProvidedBy: $scope.providedBy, TypeOfAssessment: $scope.typeOfAssessment, ExpectationForCompetence: $scope.expectation, OutcomeStatus: $scope.outcomeStatus, Comment: $scope.comment }
    //    }
    //    $http(httpreq).success(function (response) {
    //        $scope.fillList();
    //        alert("Saved successfully.");
    //    })


    //};

    //test upload
    $(function () {

        var reader = new FileReader();
        //var reader2 = new FileReader();
        var fileName = "";
        var fileName2 = "";
        $('[id*=FileUpload1]').change(function () {
            if (typeof (FileReader) != "undefined") {
                //var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
                var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.doc|.docx|.pdf)$/;
                $($(this)[0].files).each(function () {
                    var file = $(this);
                    if (regex.test(file[0].name.toLowerCase())) {
                        fileName = file[0].name;
                        reader.readAsDataURL(file[0]);
                    } else {
                        alert(file[0].name1 + " is not a valid image file.");
                        return false;
                    }
                });
            } else {
                alert("This browser does not support HTML5 FileReader.");
            }
        });
        //second upload

        $('[id*=FileUpload2]').change(function () {
            if (typeof (FileReader) != "undefined") {
                //var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
                var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.doc|.docx|.pdf)$/;
                $($(this)[0].files).each(function () {
                    var file = $(this);
                    if (regex.test(file[0].name.toLowerCase())) {
                        fileName2 = file[0].name;
                        reader.readAsDataURL(file[0]);
                    } else {
                        alert(file[0].name + " is not a valid pdf or docx file.");
                        return false;
                    }
                });
            } else {
                alert("This browser does not support HTML5 FileReader.");
            }
        });

        $("[id*=btnSave]").click(function () {
            $scope.submitted = true;
            var byteData = reader.result;
            var byteData2 = reader.result;

            if (byteData == null && byteData2 == null) {
                var obj = {};
                obj.Data = byteData;
                obj.FileName = "";
                obj.Data2 = byteData2;
                obj.FileName2 = "";

            }
            else {
                if (byteData != "" && byteData2 != "") {
                    //if (byteData != "") 
                    //{
                    byteData = byteData.split(';')[1].replace("base64,", "");
                    var obj = {};
                    obj.Data = byteData;
                    obj.FileName = fileName;
                    obj.Data2 = byteData2;
                    obj.FileName2 = fileName2;
                    //}
                    //else if (byteData2 != "") {
                    //byteData2 = byteData2.split(';')[1].replace("base64,", "");
                    //var obj = {};
                    //obj.Data = "";//byteData;
                    //obj.FileName = "";
                    //obj.Data2 = byteData2;
                    //obj.FileName2 = fileName2;

                    //}
                }
                else if (byteData != "") {
                    byteData = byteData.split(';')[1].replace("base64,", "");
                    var obj = {};
                    obj.Data = byteData;
                    obj.FileName = fileName;
                }
                else if (byteData2 != "") {
                    byteData2 = byteData2.split(';')[1].replace("base64,", "");
                    var obj = {};
                    obj.Data2 = byteData2;
                    obj.FileName2 = fileName2;
                }
                
            }

            $.ajax({
                type: "POST",
                url: "TrainingService.asmx/Save",
                data: '{ EmployeeID:' + JSON.stringify($scope.empID) + ', ProductId: ' + JSON.stringify($scope.prodId) + ', DateCompleted:' + JSON.stringify($scope.completed) + ', VerifiedDate: ' + JSON.stringify($scope.verified) + ', TrainingProvidedBy:' + JSON.stringify($scope.providedBy) + ', TypeOfAssessment: ' + JSON.stringify($scope.typeOfAssessment) + ', ExpectationForCompetence:' + JSON.stringify($scope.expectation) + ', OutcomeStatus: ' + JSON.stringify($scope.outcomeStatus) + ', Comment:' + JSON.stringify($scope.comment) + ',fileData : ' + JSON.stringify(obj) + ', LogUserId:' + JSON.stringify($scope.LogUserId) + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {
                    alert("Save successfully.");
                    window.location.reload();
                }

            });
            return false;

        });
    });


    //view document
    //$http.get('TrainingService.asmx/GetFile').
    //    success(function (data, status, headers, config) {
    //        //debugger;
    //        $scope.FileList = data;
    //    }).
    //    error(function (data, status, headers, config) {
    //        alert("erro");
    //    });


    // retrive Emp drop down
    $scope.fillList = function () {
        $scope.studetnName = "";
        var httpreq = {
            method: 'POST',
            url: 'TrainingService.asmx/GetDropList',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        }
        $http(httpreq).success(function (response) {
            $scope.EmpTraininglist = response.d;
        })
    };
    $scope.fillList();


    //Product
    $scope.fillList = function () {
        $scope.studetnName = "";
        var httpreq = {
            method: 'POST',
            url: 'TrainingService.asmx/GetProduct',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        }
        $http(httpreq).success(function (response) {
            $scope.Productlist = response.d;
        })
    };
    $scope.fillList();

    $scope.fillList = function () {
        $scope.studetnName = "";
        var httpreq = {
            method: 'POST',
            url: 'TrainingService.asmx/GetProductType',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        }
        $http(httpreq).success(function (response) {
            $scope.ProductTypelist = response.d;
        })
    };
    $scope.fillList();

    //Product Type
    $scope.genders = ["Male", "Female"];
    $scope.outcomeStatu = ["Pending", "Completed"];







});
//app.filter("removeDups", function () {
//    return function (data) {
//        if (angular.isArray(data)) {
//            var result = [];
//            var key = {};
//            for (var i = 0; i < data.length; i++) {
//                var val = data[i];
//                if (angular.isUndefined(key[val])) {
//                    key[val] = val;
//                    result.push(val);
//                }
//            }
//            if (result.length > 0) {
//                return result;
//            }
//        }
//        return data;
//    }
//})

//filter to remove duplicates and show unique values
app.filter('unique', function () {

    return function (items, filterOn) {


        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});
