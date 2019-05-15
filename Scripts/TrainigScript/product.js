////save 
//var app = angular.module("myApp", []);

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

//Get current date
app.filter('currentdate', ['$filter', function ($filter) {
    return function () {
        return $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
    };
}])


app.controller("addProductCntrl", function ($scope, $http, $rootScope, checkAuth) {

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

    $scope.Save = function () {
        $scope.submitted = true;
        var httpreq = {
            method: 'POST',
            url: 'TrainingService.asmx/AddProduct',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: { Id: $scope.Id, ProductType: $scope.productType, ProductSubType: $scope.productSubType, TrainingType: $scope.trainingType, DepartmentId: $scope.departmentId/*, LogDate: $scope.logDate*/ }
        }
        $http(httpreq).success(function (response) {
            $scope.fillList();
            alert("Saved successfully.");
            window.location.reload();
        })
    };


    // retrive All department
    $scope.fillList = function () {
        var httpreq = {
            method: 'POST',
            url: 'TrainingService.asmx/GetDepartmentList',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        }
        $http(httpreq).success(function (response) {
            $scope.DepartmentDropList = response.d;
        })
    };
    $scope.fillList();

    //Retrive Products
    $scope.fillList = function () {

        var httpreq = {
            method: 'POST',
            url: 'TrainingService.asmx/GetProducts',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        }
        $http(httpreq).success(function (response) {
            $scope.ListProducts = response.d;
        })
    };
    $scope.fillList();


});


app.controller("viewProductCntrl", function ($scope, $http, $location, $rootScope, checkAuth, $filter) {

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
    $scope.itemsPerPage = 15;
    $scope.currentPage = 0;

    $scope.pageCount = function () {
        var pages = $filter('filter')($scope.items, $scope.searchText);
        return Math.ceil(pages.length / $scope.itemsPerPage);
    };

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

    $scope.$watch('searchText.ProductType', function (v) {
        $scope.currentPage = 0;
        $scope.pages = $scope.range();
    });

    $scope.$watch('searchText.ProductSubType', function (v) {
        $scope.currentPage = 0;
        $scope.pages = $scope.range();
    });




    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
        return Math.ceil($scope.ListProducts.length / $scope.itemsPerPage);
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

    //search all
    $scope.numberOfItems = function () {
        return ($filter('filter')($scope.ListProducts, $scope.searchText)).length;
    }


    //department
    // retrive All department
    $scope.fillList = function () {
        var httpreq = {
            method: 'POST',
            url: 'TrainingService.asmx/GetDepartmentList',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        }
        $http(httpreq).success(function (response) {
            $scope.DepartmentDropList = response.d;
        })
    };
    $scope.fillList();



    //Retrive Products
    $scope.fillList = function () {

        var httpreq = {
            method: 'POST',
            url: 'TrainingService.asmx/GetProducts',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        }
        $http(httpreq).success(function (response) {
            $scope.ListProducts = response.d;
        })
    };
    $scope.fillList();

    //Redirect to add Product
    $scope.AddNewProduct = function () {
        $location.path('/addProduct');
    };



    $scope.outcomeStatu = ["Pending", "Completed"];

    //Edit 

    $scope.editProduct = function (product) {
        $scope.ListProducts.Id = product.Id;
        $scope.ListProducts.productType = product.ProductType;
        $scope.ListProducts.productSubType = product.ProductSubType;
        $scope.ListProducts.trainingType = product.TrainingType;
        $scope.ListProducts.departmentId = product.DepartmentId;

        $('#edit').modal('show');
    };

    $scope.updateProduct = function () {

        if (confirm("Are you sure want to update?")) {
            var httpreq = {
                method: 'POST',
                url: 'TrainingService.asmx/EditProduct',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'dataType': 'json'
                },
                data: { Id: $scope.ListProducts.Id, ProductType: $scope.ListProducts.productType,ProductSubType: $scope.ListProducts.productSubType, TrainingType: $scope.ListProducts.trainingType, DepartmentId: $scope.ListProducts.departmentId }
            }
            $http(httpreq).success(function (response) {
                $scope.fillList();
                alert("Update successfully.");
                window.location.reload();
            })

        }
        $('#edit').modal('hide');
    };

    //$scope.EditTraining = function (d) {
    //    myFactory.set(d);
    //    $location.path('/updateProduct');
    //}



    //delete
    $scope.Delete = function (SID) {
        if (confirm("Are you sure want to delete?")) {
            var httpreq = {
                method: 'POST',
                url: 'TrainingService.asmx/DeleteProduct',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'dataType': 'json'
                },
                data: { Id: SID }
            }
            $http(httpreq).success(function (response) {
                $scope.fillList();
                alert("Deleted successfully.");
                window.location.reload();
            })
        }
    };



});


app.controller("viewTrainingCntrl", function ($scope, $http, $location, myFactory, $rootScope, checkAuth, $filter ) {

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

    //Paging in a table
    $scope.itemsPerPage = 10;
    $scope.currentPage = 0;

    $scope.pageCount = function () {
        var pages = $filter('filter')($scope.items, $scope.searchText);
        return Math.ceil(pages.length / $scope.itemsPerPage);
    };



    $scope.range = function () {
        var rangeSize = 5;
        var ret = [];
        var start;

        start = $scope.currentPage;
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize;
        }

        for (var i = start; i < start + rangeSize; i++) {
            ret.push(i);
        }
        return ret;
    };


    $scope.$watch('searchText.Name', function (v) {
        $scope.currentPage = 0;
        $scope.pages = $scope.range();
    });

    $scope.$watch('searchText.ProductName', function (v) {
        $scope.currentPage = 0;
        $scope.pages = $scope.range();
    });


    $scope.$watch('currentPage', function (v) {
        $scope.pages = $scope.range();
    });


    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function () {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function () {
        return Math.ceil($scope.ConsultantTraininglist.length / $scope.itemsPerPage) - 1;
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

    //search all
    $scope.numberOfItems = function () {
        return ($filter('filter')($scope.ConsultantTraininglist, $scope.searchText)).length;
    }


    //reload page
    $scope.refreshPage = function () {
        $window.location.reload();
    }

    //Format date
    var date = new Date();
    $scope.dates = [{ Verified: date }]

    //Redirect to add training
    $scope.AddTraining = function () {
        $location.path('/captureTraining');
    };


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




    //var trainingId = 2434;
    //
    //$scope.fileList = function (/*trainingId*/) {
    //    var httpreq = {
    //        method: 'POST',
    //        url: 'http://localhost:21847/TrainingService.asmx/GetFile',
    //        headers: {
    //            'Content-Type': 'application/json; charset=utf-8',
    //            'dataType': 'json'
    //        },
    //        data: { /*TrainingId:trainingId*/}
    //    }
    //    $http(httpreq).success(function (response) {
    //        $scope.ViewFiles = response.d;
    //    })
    //};


    $http.get('TrainingService.asmx/GetFile').then(function (d) {

        $scope.ViewFiles = d.data;

    }
        , function (error) {

            alert('Failed');

        });



    
    //////////
    $scope.results = [];
    $scope.clickButton = function (trainingId) {
        var temp = trainingId;
       
        $scope.items =$scope.ViewFiles;

        angular.forEach($scope.items, function (item) {
            if (item.TrainingId ===temp) {
                $scope.results.push({
                    TrainingId: item.TrainingId,
                    FileName: item.FileName,
                    Path: item.Path
                });
            }
        });
    };
  


    $scope.DownloadUploadedFile = function (document) {
        window.open(document);
        //    var httpreq = {
        //        method: 'POST',
        //        url: 'TrainingService.asmx/DownloadFile',
        //        headers: {
        //            'Content-Type': 'application/json; charset=utf-8',
        //            'dataType': 'json'
        //        },
        //        data: { Id: SID }
        //    }
        //$http(httpreq).success(function (response) {
        //    $scope.fileList();
        //        alert("Download successfully.");
        //    })
        
    };
   


    // retrive All 
    $scope.fillList = function () {
        var httpreq = {
            method: 'POST',
            url: 'TrainingService.asmx/GetList',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'dataType': 'json'
            },
            data: {}
        }
        $http(httpreq).success(function (response) {
            $scope.ConsultantTraininglist = response.d;
        })
    };
    $scope.fillList();

   


    $scope.outcomeStatu = ["Pending", "Completed"];

    //Edit 

    $scope.editConsultant = function (consultant) {
        $scope.ConsultantTraininglist.Id = consultant.Id;
        $scope.ConsultantTraininglist.empID = consultant.EmployeeID;
        $scope.ConsultantTraininglist.prodId = consultant.ProductId;
        $scope.ConsultantTraininglist.completed = consultant.DateCompleted;
        $scope.ConsultantTraininglist.verified = consultant.Verified;
        $scope.ConsultantTraininglist.typeOfAssessment = consultant.TypeOfAssessment;
        $scope.ConsultantTraininglist.providedBy = consultant.TrainingProvidedBy;
        $scope.ConsultantTraininglist.expectation = consultant.ExpectationForCompetence;
        $scope.ConsultantTraininglist.outcomeStatus = consultant.OutcomeStatus;
        $scope.ConsultantTraininglist.comment = consultant.Comment;
        $scope.ConsultantTraininglist.fileName = consultant.FileName;
        $scope.ConsultantTraininglist.path = consultant.Path;
        $scope.ConsultantTraininglist.contentType = consultant.ContentType;
        $scope.ConsultantTraininglist.fileName2 = consultant.FileName2;
        $scope.ConsultantTraininglist.path2 = consultant.Path2;
        $scope.ConsultantTraininglist.contentType2 = consultant.ContentType2;
        $('#edit').modal('show');
       
    };

    $scope.updateConsultant = function () {

        if (confirm("Are you sure want to update?")) {
            var httpreq = {
                method: 'POST',
                url: 'TrainingService.asmx/Edit',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'dataType': 'json'
                },
                data: { Id: $scope.ConsultantTraininglist.Id, EmployeeID: $scope.ConsultantTraininglist.empID, ProductId: $scope.ConsultantTraininglist.prodId, TrainingProvidedBy: $scope.ConsultantTraininglist.providedBy, TypeOfAssessment: $scope.ConsultantTraininglist.typeOfAssessment, OutcomeStatus: $scope.ConsultantTraininglist.outcomeStatus, ExpectationForCompetence: $scope.ConsultantTraininglist.expectation, /*OutcomeStatus: $scope.ConsultantTraininglist.outcomeStatus,*/ Comment: $scope.ConsultantTraininglist.comment }
            }
            $http(httpreq).success(function (response) {
                $scope.fillList();
                alert("Update successfully.");
            })

        }
        $('#edit').modal('hide');
     
    };


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

        $("[id*=btnUpdate]").click(function () {
            //if (confirm("Are you sure want to update?")) {
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
                url: "TrainingService.asmx/Edit",
                data: '{Id:' + JSON.stringify($scope.ConsultantTraininglist.Id) + ', EmployeeID:' + JSON.stringify($scope.ConsultantTraininglist.empID) + ', ProductId: ' + JSON.stringify($scope.ConsultantTraininglist.prodId) + ', TrainingProvidedBy:' + JSON.stringify($scope.ConsultantTraininglist.providedBy) + ',TypeOfAssessment: ' + JSON.stringify($scope.ConsultantTraininglist.typeOfAssessment) + ',  ExpectationForCompetence: ' + JSON.stringify($scope.ConsultantTraininglist.expectation) + ', Comment:' + JSON.stringify($scope.ConsultantTraininglist.comment) + ',fileData : ' + JSON.stringify(obj) + ', LogUserId:' + JSON.stringify($scope.LogUserId) + '}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (r) {
                    $scope.fillList();
                    alert("Update successfully.");
                }

            });
        
                return false;
            //}
            //$('#edit').modal('hide');
        });
    });







    $scope.EditTraining = function (d) {
        myFactory.set(d);
        $location.path('/updateTraining');
    }



    //hide and show button
    $scope.showval = false;
    $scope.hideval = false;
    $scope.isShowHide = function (param) {
        if (param == "show") {
            $scope.showval = true;
            $scope.hideval = true;
        }
        else if (param == "hide") {
            $scope.showval = false;
            $scope.hideval = false;
        }
        else {
            $scope.showval = true;
            $scope.hideval = false;
        }
    }







    //delete
    $scope.Delete = function (SID) {
        if (confirm("Are you sure want to delete?")) {
            var httpreq = {
                method: 'POST',
                url: 'TrainingService.asmx/Delete',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'dataType': 'json'
                },
                data: { Id: SID }
            }
            $http(httpreq).success(function (response) {
                $scope.fillList();
                alert("Deleted successfully.");
                window.location.reload();
            })
        }
    };


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


});

app.controller("editTrainingCtrl", function ($scope, $http, $location, myFactory) {


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


    $scope.empTraining = myFactory.get();
    $scope.outcomeStatu = ["Pending", "Completed"];
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



    //Update trainining info
    $scope.updateConsultant = function () {

        if (confirm("Are you sure want to update?")) {
            var httpreq = {
                method: 'POST',
                url: 'TrainingService.asmx/Edit',

                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'dataType': 'json'
                },
                data: { Id: $scope.empTraining.Id, EmployeeID: $scope.empTraining.empID, ProductId: $scope.empTraining.prodId, TrainingProvidedBy: $scope.empTraining.providedBy, TypeOfAssessment: $scope.empTraining.typeOfAssessment, OutcomeStatus: $scope.empTraining.outcomeStatus, ExpectationForCompetence: $scope.empTraining.expectation, OutcomeStatus: $scope.empTraining.outcomeStatus, Comment: $scope.empTraining.comment }
            }
            $http(httpreq).success(function (response) {
                $scope.fillList();
                alert("Update successfully.");
            })

        }
    };
});
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
