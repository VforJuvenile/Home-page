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