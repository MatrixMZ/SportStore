angular.module("sportsStoreAdmin")
.constant("authUrl", "http://localhost:2403/users/login")
.constant("ordersUrl", "http://localhost:2403/orders")
.controller("authCtrl", function($scope, $http, $location, authUrl){
    $scope.authenticate = function(user, pass){
        $http.post(authUrl, {
            username: user,
            password: pass
        },{
            withCredentials: true
        })
        .then(function(response) {
            $location.path("/main");
        },
        function(response) {
            $scope.authenticationError = response;
            console.log('failed', response);
        });
    }
})
.controller("mainCtrl", function($scope){
    $scope.screens = ["Produkty", "Zamówienia"];
    $scope.current = $scope.screens[0];

    $scope.setScreen = function(index){
        $scope.current = $scope.screens[index];
    };

    $scope.getScreen = function(){
        if($scope.current == "Produkty"){
            return "/views/adminProducts.html";
        }else{
            return "/views/adminOrders.html"
        }
    };
})
.controller("ordersCtrl", function($scope, $http, ordersUrl){
    $http.get(ordersUrl,{ withCredentials: true })
        .then(function(response) {
            $scope.orders = response.data;
        },
        function(response){
            console.log('failed', response);
        });

    $scope.selectedOrder;

    $scope.selectOrder = function(order){
        $scope.selectedOrder = order;
    }

    $scope.calcTotal = function(order){
        var total = 0;
        for(var i = 0; i < order.products.length; i++){
            total += order.products[i].count * order.products[i].price;
        }
        return total;
    }
});
