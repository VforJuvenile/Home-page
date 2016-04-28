function BookMarkerCtrl($scope, $uibModal, $log, BookMarkers, getBookMarker, arrayOperation, strOperation) {
    console.log("saf");
    $scope.bookMarkers = BookMarkers;

    $scope.isContainsShow = false;
    $scope.isBmLoad = false;
    
    getBookMarker.get("scripts/bookMarker.php").success(function (data) {

        // 对汉字长度超过6、英文长度超过10的书签进行过滤
        $scope.bmBlocks = arrayOperation.executeFilterFunc(data, "markerName", function(value){
            return strOperation.isChinese(value[0]) ? value.length < 6 : value.length < 10;
        });
        $scope.bmItems = arrayOperation.executeFilterFunc(data, "markerName", function(value){
            return strOperation.isChinese(value[0]) ? value.length > 5 : value.length > 9;
        });
        $scope.bmNum = $scope.bmBlocks.length;
        $scope.isBmLoad = true;

    });
    
    // 一行显示多少个书签
    // last 最后一行个数
    $scope.blockObj = function (i, pw) {
        this.perCowNum = 7;
        this.Cows = Math.floor($scope.bmNum / this.perCowNum);
        this.lastNum = Math.floor($scope.bmNum % this.perCowNum);
        this.height = 20;
        this.margin = 10;
        this.parentW = 0;
        this.border = "1px solid red";
        this.left = 0;
        this.left = 0;
        this.x = i ? Math.floor(i / this.perCowNum) : 0;
        this.y = i ? i % this.perCowNum : 0;
        this.width = pw ? ((pw - (this.perCowNum + 1) * this.margin) / this.perCowNum) : 0;
        this.top = this.height * this.x + this.margin * (this.x + 1);
        this.left = this.width * this.y + this.margin * (this.y + 1);
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
.controller('addBMModalInstanceCtrl', function ($scope, $uibModalInstance, $http, $state, items) {

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
        $http.get("scripts/addBookMarker.php?urlName="+ $scope.urlName+"&url="+$scope.url).success(function(data){
            $scope.InsertInfo = data;
            $scope.showAddBMDiv = false;
            $state.go($state.current, null, {reload: true});
        }).error(function(data){
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