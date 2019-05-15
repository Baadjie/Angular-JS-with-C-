app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

app.controller("outstandingCntrl", function ($scope, $http, $location, $rootScope, checkAuth, $filter) {

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

    $scope.$watch('searchText.Name', function (v) {
        $scope.currentPage = 0;
        $scope.pages = $scope.range();
    });
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
        return Math.ceil($scope.outstandingTrainingList.length / $scope.itemsPerPage);
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
        return ($filter('filter')($scope.outstandingTrainingList, $scope.searchText)).length;
    }


 

    $http.get('TrainingService.asmx/GetOutstandingList').then(function (d) {

        $scope.outstandingTrainingList = d.data;

       }
        , function (error) {

            alert('Failed');

        });




});
