
console.log("what are you looking for");
// 获取所有书签信息
app.factory('getBookMarker', function($http){
	return {
		get: function(url){
			return $http.get(url);
		},
		post: function(url){
			return $http.post(url);
		}
	};
});

// 用户信息如何传入
// 从后台来的数据怎么给directive生成html模板（c跟directive的交互）
// $http error也是要有处理的；
// 传回的值，先是以html的方式加载到页面上，而不是刷新整个界面
app.controller("BookMarkerCtrl",['$scope', 'getBookMarker',
	function($scope, getBookMarker){
		
		getBookMarker.get("scripts/bookMarker.php").success(function(data){
			$scope.userInfo = data;
		});
		$scope.hideAddBMDiv = true;
		$scope.showAddBMDiv = false;
		$scope.addBookMarkerShow = function(){
			$scope.showAddBMDiv = true;
		};
		
		$scope.hiddenBookMarker = function(){
		
			$scope.showAddBMDiv = false;
		};	
	}
]);

// 添加书签
// 可以封装成服务
app.controller("urlAddCtrl", function($scope, $http){

	$scope.urlName = ""; 
	$scope.url = "";
	$scope.error = {
		urlName : "",
		url : ""
	}
	// 应该返回userInfo最为合理
	// 问题是如何复写bookMarker中取得所有数据的方法
	$scope.addBookMarker = function(){
		if($scope.urlName == "" || $scope.url == ""){
			console.log("a");
			$scope.error.urlName = ($scope.urlName == "") ? "请输入书签名称!" : "";
			$scope.error.url = ($scope.url == "") ? "请输入书签地址!" : "";
			return;
		}
		$http.get("scripts/addBookMarker.php?urlName="+ $scope.urlName+"&url="+$scope.url).success(function(data){
			$scope.InsertInfo = data;
			$scope.showAddBMDiv = false;
		}).error(function(data){
			$scope.InsertInfo = data;
		});
	};

	$scope.adsFoucs = function(){
		console.log("focus");
		$scope.error = {
			urlName : "",
			url : ""
		}
	};

});

