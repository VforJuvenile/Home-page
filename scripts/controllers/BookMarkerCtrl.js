angular.module("BookMarkers", []).controller("BookMarkerCtrl", function($scope, $uibModal, $state, $log, BookMarkers, arrayOperation, strOperation, BookMarker, bmBlocks) {

    // 根据规则拿到主、次显示模块的数据
    $scope.mainBmBlocks = bmBlocks.getMain(BookMarkers);
    $scope.secondaryBmBlocks = bmBlocks.getSecondary();

    $scope.orderId = "sortId";

    $scope.dragSettings = {
        waiting: 2000,
        allowFluid: false,
        moveStart: function(){

        },
        moving: function(){

        },
        ended: function(){

        }
    }

    $scope.goDeBm = function(){
        $state.go("index.deBookMarker", {}, {reload: true});
    }

    $scope.animationsEnabled = true;
    $scope.insertResult  = "";
    $scope.open = function (size, obj) {

        // 向模态框传递数据，resolve
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'addBMModalContent.html',
            controller: 'addBMModalInstanceCtrl',
            size: size,
            resolve: {
                obj : obj
            }
        });
        
        // var bm = BookMarker.get({"id":"要删除的标签名2", "isGet": "yes"});
        // bm.$delete({"id":"aaaa", "isGet": "yes"});
        // bm.$promise.then(function success(){
        //     $state.go($state.current.name, {}, {reload: true});
        // }, function error(){
        // })

        // open方法返回一个modal实例，
        // 具有close,dismiss,result,opened,closed,rendered等属性
        // 从模态框拿回数据
        modalInstance.result.then(function (InsertInfo) {

          $scope.insertResult = InsertInfo;

        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });

    };

    $scope.dynamicPopover = {
        content: '修改书签',
        templateUrl: 'bmSettingTemplate.html',
        title: '设置'
    };

})

// BookMarkerCtrl.resolve = {
//     delay: function ($q) {
//         var delay = $q.defer();
//         var load = function () {
//             // $.getScript("scripts/directives/userDirective.js", function () {
//             //     delay.resolve();
//             // });
//             delay.resolve();
//         };
//         load();
//         // console.log("resolve onload");
//         return delay.promise;
//     }
// }
.controller('addBMModalInstanceCtrl', function ($scope, $uibModalInstance, $http, $state, obj, $q, BookMarker) {

    $scope.obj = obj;
    $scope.title = obj.id ? "修改书签" : "添加书签"; 
    $scope.urlName = obj.markerName || ""; 
    $scope.url = obj.markerUrl || "";
    $scope.error = {
        urlName : "",
        url : ""
    }
    $scope.InsertInfo = "";
    // 问题是如何复写bookMarker中取得所有数据的方法
    $scope.addBookMarker = function(){
        if($scope.urlName == "" || $scope.url == ""){
            $scope.error.urlName = ($scope.urlName == "") ? "请输入书签名称!" : "";
            $scope.error.url = ($scope.url == "") ? "请输入书签地址!" : "";
            return;
        }
        
        var saveBm = BookMarker.save({"urlName": $scope.urlName, "url": $scope.url, "id": obj.id});
        saveBm.$promise.then(function success(data){
            $scope.InsertInfo = data;
            console.log("success");
            $scope.showAddBMDiv = false;
            $state.go($state.current.name, null, {reload: true});
        }, function error(data){
            // console.log("error");
            $scope.InsertInfo = data;
        });
        // $uibModalInstance.close($scope.selected.item);
        $uibModalInstance.close($scope.InsertInfo);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})

.controller("deBookMarkerCtrl", ["$scope", "lStorage", "bmBlocks", function($scope, lStorage, bmBlocks){
    
    $scope.deBmBlocks = bmBlocks.getDelete();

    $scope.removeBmBlocks = function(){
        bmBlocks.set("sortN", $scope.deBmBlocks);
    }

}]);
