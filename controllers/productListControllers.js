angular.module("sportsStore")
.constant("productListActiveClass", "btn-primary")
.constant("productListPageCount", 4)
.controller('productListCtrl', function($scope, $filter, productListActiveClass, productListPageCount, cart){
    var selectedCategory = null;

    $scope.selectedPage = 1;
    $scope.pageSize = productListPageCount;

    $scope.selectedCategory = function(newCategory){
        selectedCategory = newCategory;
        $scope.selectedPage = 1;

    }

    $scope.selectPage = function (newPage) {
        $scope.selectedPage = newPage;
    }

    $scope.categoryFilterFn = function(product){
        return selectedCategory == null || product.category == selectedCategory;
    }

    $scope.getCategoryClass = function(category){
       // return selectedCategory == category ? productListActiveClass : "";
        if(selectedCategory == category){
            return productListActiveClass;
        }
    }

    $scope.getPageClass = function(page){
        return $scope.selectedPage == page ? productListActiveClass : "";
    }

    $scope.addProductToCart = function(product){
        cart.addProduct(product.id, product.name, product.price);
    }
});
