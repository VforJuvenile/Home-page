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

// angular自动聚焦
app.directive('focusMe', function($timeout, $parse){

	return {
		link: function(scope, element, attrs){
			var model = $parse(attrs.focusMe);
			scope.$watch(attrs.focusMe, function(value){
				if(value === true){
					$timeout(function(){
						element[0].focus();
					});
				}
			});
			// element.bind('blur', function(){
			// 	console.log("blur");
			// 	scope.$apply(model.assign(scope, false));
			// })
		}
	}
});


app.directive("focusChange", function(){
	return {
		link: function(scope, element, attrs){
			element.bind("focus", function(){
				scope.error.urlName = "";
				scope.error.url = "";
			});
		}
	}
});

app.directive("childrenAdaptWidth", function(){
	return {
		restrict: 'AE',
		link: function(scope, element, attrs){
			element.bind("DOMNodeInserted", function(){
				console.log("c="+element.children().length);
			});
		}
	}
});

app.directive('adaptwidth', function(){

	return {
		restrict: 'E',
		template: "<span ng-transclude></span>",
		transclude: true,
		link: function(scope, element, attrs){
			console.log("w");
			// var num = element.css("height");
			// console.log(element.style.height);
			// console.log(num);
			// 遍历每一个元素
			var elementSiblings = element.parent().children();
			for(var i = 0; i < elementSiblings.length; i++){

				var left = i * 100 + "px";
				elementSiblings.eq(i).css({
					"left": left, 
					"border": "1px solid blue",
					"width": "100px"
				});

			}
		}

	};
});
// 设置
app.controller("SettingCtrl", function($scope){

});