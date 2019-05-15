var app = angular.module('loginApp', ['ngRoute', 'ngAnimate', 'ngMessages']);
//var app = angular.module('loginApp', ['ngRoute']);
app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});


app.filter('mvcDate', ['$filter', $filter =>
    (date, format, timezone) =>
        date && $filter('date')(date.slice(6, -2), format, timezone)
]);