function BookMarkerCtrl($scope, $uibModal, $state, $log, BookMarkers, arrayOperation, strOperation, BookMarker, bmBlocks) {

    $scope.mainBmBlocks = bmBlocks.getMain(BookMarkers, "sortN");
    $scope.secondaryBmBlocks = bmBlocks.getSecondary();

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


    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;
    $scope.insertResult  = "";
    $scope.open = function (size) {

        // 向模态框传递数据，resolve
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'addBMModalContent.html',
            controller: 'addBMModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
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

}

BookMarkerCtrl.resolve = {
    delay: function ($q) {
        var delay = $q.defer();
        var load = function () {
            // $.getScript("scripts/directives/userDirective.js", function () {
            //     delay.resolve();
            // });
            delay.resolve();
        };
        load();
        // console.log("resolve onload");
        return delay.promise;
    }
}

angular.module("BookMarkers", [])
.controller('addBMModalInstanceCtrl', function ($scope, $uibModalInstance, $http, $state, items, $q, BookMarker) {

    $scope.urlName = ""; 
    $scope.url = "";
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
        
        var saveBm = BookMarker.save({"urlName": $scope.urlName, "url": $scope.url});
        saveBm.$promise.then(function success(data){
            $scope.InsertInfo = data;
            console.log("success");
            $scope.showAddBMDiv = false;
            $state.go($state.current.name, null, {reload: true});
        }, function error(data){
            console.log("error");
            console.log(data);
            $scope.InsertInfo = data;
        });
        // $uibModalInstance.close($scope.selected.item);
        $uibModalInstance.close($scope.InsertInfo);
    }

    $scope.adsFoucs = function(){
        $scope.error = {
            urlName : "",
            url : ""
        }
    }

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});