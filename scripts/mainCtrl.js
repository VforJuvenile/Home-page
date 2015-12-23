var app = angular.module('app', ['ngRoute']); 

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/plan', {
		templateUrl: 'views/plan.html',
		controller: 'MyPlanCtrl'
	})
	.when('/history',{
		templateUrl: 'views/history.html',
		controller: 'HistoryCtrl'
	})
	.when('/bookMarker',{
		templateUrl: 'views/bookMarker.html',
		controller: BookMarkerCtrl,
	    resolve: BookMarkerCtrl.resolve
	})
	.when('/setting',{
		templateUrl: 'views/setting.html',
		controller: 'SettingCtrl'
	})
	.otherwise({
		redirectTo: '/plan'
	})
}])

app.controller('bodyCtrl', function($scope){
	$scope.homeShow = false;
	$scope.timeShow = function(){
		$scope.homeShow = true;
	}
	$scope.timeHide = function(){
		$scope.homeShow = false;
	}

})

app.controller('siderClick', function($scope, $rootScope){
	
	$scope.siderbarList = [
		{
			xuhao : "个人计划",
			id: "list"
		},{
			xuhao : "历史记录",
			id:"history"
		},{
			xuhao : "书签",
			id: 'bookMarker'
		},{
			xuhao : "设置",
			id:"setting"
		}
	];

})

app.controller('MyPlanCtrl', function($scope,$http){
	// 如何设置会话
	// $http.get("plan.php?")	
	// var user = {"name": "wf"};
	 $http.get("scripts/plan.php?a=b").success(function(data){
	 	$scope.user = data;
	 })
	 // $http.get("scripts/plan.php", user).success(function(data){
	 // 	$scope.user = data;
	 // });
	// $http.post("/foo/bar", requestData, {
 //    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
 //    transformRequest: transform
	// }).success(function(responseData) {
    //do stuff with response
// });
})

app.controller('HistoryCtrl', function($scope,$http){

	$http.get("data/test.json").success(function(data){
		$scope.user = data;
	})
})

// 设置
app.controller("SettingCtrl", function($scope){

})



// 用户信息如何传入
// 从后台来的数据怎么给directive生成html模板（c跟directive的交互）
// $http error也是要有处理的；
// 传回的值，先是以html的方式加载到页面上，而不是刷新整个界面
function BookMarkerCtrl($scope, getBookMarker){
	// console.log("enter controller and load back");
		getBookMarker.get("scripts/bookMarker.php").success(function(data){
			$scope.userInfo = data;
			$scope.bmNum = data.length;
		})
		$scope.hideAddBMDiv = true;
		$scope.showAddBMDiv = false;
		$scope.addBookMarkerShow = function(){
			$scope.showAddBMDiv = true;
		}
		
		$scope.hiddenBookMarker = function(){
		
			$scope.showAddBMDiv = false;
		}

		// 一行显示多少个书签
		// x 每行个数
		// y 总行数
		// last 最后一行个数
		$scope.block = {
			perCowNum : 17,
			Cows : Math.floor($scope.bmNum/this.perCowNum),
			lastNum : Math.floor($scope.bmNum%this.perCowNum),
			width: 30,
			height: 20,
			margin: 0,
			parentW: 0
		}

				
		$scope.blockObj = function(i){
			return {
				x: i ? Math.floor($scope.bmNum%i) : 0,
				y: i ? Math.floor($scope.bmNum/i) : 0
			}
		}
}

BookMarkerCtrl.resolve = {
	delay: function($q){
		var delay = $q.defer();
		var load = function(){
			$.getScript("scripts/directives/userDirective.js", function(){
				delay.resolve();
			});
		};
		load();
		console.log("resolve onload");
		return delay.promise;
	}
}
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
		})
	}

	$scope.adsFoucs = function(){
		console.log("focus");
		$scope.error = {
			urlName : "",
			url : ""
		}
	}

})

