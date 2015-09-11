var app = angular.module('app', ['ngRoute']); 

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	// .when('/home',{
	// 	templateUrl: 'views/home.html',
	// 	controller: 'HomeCtrl'
	// })
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
		controller: 'BookMarkerCtrl'
	})
	.when('/setting',{
		templateUrl: 'views/setting.html',
		controller: 'SettingCtrl'
	})
	.otherwise({
		redirectTo: '/plan'
	});
}]);

app.controller('bodyCtrl', function($scope){
	$scope.homeShow = false;
	$scope.timeShow = function(){
		$scope.homeShow = true;
	};
	$scope.timeHide = function(){
		$scope.homeShow = false;
	};

});

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

});

app.controller('MyPlanCtrl', function($scope,$http){
	// 如何设置会话
	// $http.get("plan.php?")	
	// var user = {"name": "wf"};
	 $http.get("scripts/plan.php?a=b").success(function(data){
	 	$scope.user = data;
	 });
	 // $http.get("scripts/plan.php", user).success(function(data){
	 // 	$scope.user = data;
	 // });
	// $http.post("/foo/bar", requestData, {
 //    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
 //    transformRequest: transform
	// }).success(function(responseData) {
    //do stuff with response
// });
});

app.controller('HistoryCtrl', function($scope,$http){

	$http.get("data/test.json").success(function(data){
		$scope.user = data;
	});

});

app.directive('userName', function(){
	return {
		restrict: 'AE',
		replace: false,
		// template:
		link: function(scope, element, attrs){
			// return "wf";
		}
	};
});

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
			console.log(data);
		});
	
		$scope.addDivShow = false;
		$scope.addBookMarkerShow = function(){
			$scope.addDivShow = true;
		};
		
		$scope.hiddenBookMarker = function(){
		
			$scope.addDivShow = false;
		};	
	}
]);

// 添加书签
// 可以封装成服务
app.controller("urlAddCtrl", function($scope, $http){
	$scope.aa ="sagadgs";

	// 应该返回userInfo最为合理
	// 问题是如何复写bookMarker中取得所有数据的方法
	$scope.addBookMarker = function(){
		$http.get("scripts/addBookMarker.php?urlName="+ $scope.urlName+"&url="+$scope.url).success(function(data){
			$scope.InsertInfo = data;
			$scope.addDivShow = false;
			// $scope.userInfo
		}).error(function(data){
			$scope.InsertInfo = data;
		});
		// $scope.aa = "wf";
	};


});

app.directive('adaptwidth', function(){

	return {
		restrict: 'EAC',
		replace: true,
		complie: function(el, attrs, transclude){
			console.log("a");

			return function(scope, el, attrs, controller){
				console.log("b");
			};
		}

	};
});
// 设置
app.controller("SettingCtrl", function($scope){

});