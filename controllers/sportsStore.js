var app = angular.module('sportsStore', ['customFilters', 'cart', 'ngRoute']);

app.constant("dataUrl", "json/products.json");
app.constant("orderUrl", "phpmodule/saveOrder.php")
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
        $http({
            url: orderUrl,
            data : $scope.data.products,
            method : 'POST',
            headers : {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
        })
        .then(function(response) {
                $scope.data.orderId = response.data;
//                $location.path("/complete");         // commented for testing
//                cart.getProducts().length = 0;
            alert(response.data);                       //delete after testing
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
        templateUrl: "/views/checkoutSummary.html"
    });
    $routeProvider.when('/products', {
        templateUrl: "/views/productList.html"
    });
    $routeProvider.otherwise({
        templateUrl: "/views/productList.html"
    });
    $routeProvider.when("/complete", {
        templateUrl: "/views/thankYou.html"
    });
    $routeProvider.when("/placeorder", {
        templateUrl: "/views/placeOrder.html"
    });

});
