var app = angular.module('app', ['ngRoute']); 

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/list', {
		templateUrl: 'views/list.html',
		controller: 'RouteListCtrl'
	})
	.when('/history',{
		templateUrl: 'views/history.html',
		controller: 'RouteOtherCtrl'
	})
	.otherwise({
		redirectTo: '/list'
	});
}]);

app.controller('siderClick', function($scope){
	$scope.siderbarList = [
		{
			xuhao : "个人计划",
			id: "list"
		},{
			xuhao : "历史记录",
			id:"history"
		},{
			xuhao : "书签",
			id: 'book'
		},{
			xuhao : "设置",
			id:"setting"
		}
	];
});

app.controller('page1', function($scope){

});