angular.module("umbraco").controller("distributionPickerCtrl", function ($scope, contentResource) {

    var PARENT_PAGE = 1919;

    $scope.model.hideLabel = true;

    $scope.items = [];

    if(!$scope.model.value)
    {
        $scope.model.value = {
            suppliers: [],
            distributions: []
        }
    }

    contentResource.getChildren(PARENT_PAGE).then(function (result) {
        angular.forEach(result.items, function(distribution, index){
            if(distribution.published) { // get published only
                var item = {};
                item.name = distribution.name;
                item.id = distribution.id;

                contentResource.getChildren(distribution.id).then(function(result){
                    item.children = result.items
                        .filter(supplier => supplier.published) // get published only
                        .map(function(supplier){
                        return {
                            name: supplier.name,
                            id: supplier.id
                        }
                    });
                    $scope.items.push(item);
                });    
            }
        });
    });

    $scope.toggleSupplierSelection = function(id){
        var idx = $scope.model.value.suppliers.indexOf(id);

        // Is currently selected
        if (idx > -1) {
          $scope.model.value.suppliers.splice(idx, 1);
        }

        // Is newly selected
        else {
          $scope.model.value.suppliers.push(id);
        }
    }

    $scope.toggleDistributionSelection = function(id){
        var idx = $scope.model.value.distributions.indexOf(id);

        // Is currently selected
        if (idx > -1) {
            $scope.model.value.distributions.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.model.value.distributions.push(id);
        }
    }
});