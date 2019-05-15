//filter for paging
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



////Paging in a table
//$scope.itemsPerPage = 10;
//$scope.currentPage = 0;


//$scope.range = function () {
//    var rangeSize = 5;
//    var ret = [];
//    var start;

//    start = $scope.currentPage;
//    if (start > $scope.pageCount() - rangeSize) {
//        start = $scope.pageCount() - rangeSize + 1;
//    }

//    for (var i = start; i < start + rangeSize; i++) {
//        ret.push(i);
//    }
//    return ret;
//};

//$scope.prevPage = function () {
//    if ($scope.currentPage > 0) {
//        $scope.currentPage--;
//    }
//};

//$scope.prevPageDisabled = function () {
//    return $scope.currentPage === 0 ? "disabled" : "";
//};

//$scope.pageCount = function () {
//    return Math.ceil($scope.EmployeeList.length / $scope.itemsPerPage) - 1;
//};

//$scope.nextPage = function () {
//    if ($scope.currentPage < $scope.pageCount()) {
//        $scope.currentPage++;
//    }
//};

//$scope.nextPageDisabled = function () {
//    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
//};

//$scope.setPage = function (n) {
//    $scope.currentPage = n;
//};

////Format date
//var date = new Date();
//$scope.dates = [{ Verified: date }]

