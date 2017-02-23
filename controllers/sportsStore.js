var app = angular.module('sportsStore', ['customFilters', 'cart', 'ngRoute']);

//app.constant("dataUrl", "json/products.json");
app.constant("dataUrl", "http://localhost:2403/products");
app.constant("orderUrl", "http://localhost:2403/orders");
app.controller('sportsStoreCtrl', function($scope,cart, $http, dataUrl, orderUrl, $location){
    $scope.data = {};
    $http.get(dataUrl).then(function(response){
        $scope.data.products = response.data;
    },function(data){
        $scope.data.error = data;
    });


    $scope.sendOrder = function(shippingDetails){
        var order = angular.copy(shippingDetails);
        order.products = cart.getProducts();

        $http.post(orderUrl, order)
        .then(function(response) {
                $scope.data.orderId = response.data.id;
                $location.path("/complete");
                cart.getProducts().length = 0;
        },
        function(response) {
                $scope.data.orderError = "error";
                $location.path("/complete");
        });
    }




});
app.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(false).hashPrefix('');
    $routeProvider.when('/checkout', {
        templateUrl: "views/checkoutSummary.html"
    });
    $routeProvider.when('/products', {
        templateUrl: "views/productList.html"
    });
    $routeProvider.otherwise({
        templateUrl: "views/productList.html"
    });
    $routeProvider.when("/complete", {
        templateUrl: "views/thankYou.html"
    });
    $routeProvider.when("/placeorder", {
        templateUrl: "views/placeOrder.html"
    });

});
