angular.module("Api", []).controller("apiCtrl", ["$scope", "$uibModal", "$state", "$log", "apiData", function($scope, $uibModal, $state, $log, apiData){
	$scope.name = "api";
	$scope.apiData = apiData;
	console.log(apiData);

	$scope.open = function (size, obj) {

		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
            templateUrl: 'operateAPIModalContent.html',
            controller: 'operateAPIModalInstanceCtrl',
            size: size,
            resolve: {
                obj : obj
            }
        });

        modalInstance.result.then(function (returnInfo) {

        	$scope.info = returnInfo;

        }, function () {
        	$log.info("Modal dismissed at: " + new Date());
        });

	}
}])
.controller("operateAPIModalInstanceCtrl", function($scope, $uibModalInstance, $http, $state, $log, obj) {

	$scope.title = obj.fileName;
	$scope.keys = Object.keys(obj.data[0] || {}).filter(function(item) {
		return item !== "$$hashKey" && item !== "lastChangeBy" && item !== "lastChangeTime"
	});

	$scope.obj = obj.data[0];

	$scope.addAPI = function (){
		
	}

	$scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

})