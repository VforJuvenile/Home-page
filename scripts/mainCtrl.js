// var app = angular.module('app', ['ngRoute']); 

// app.config(['$routeProvider', function($routeProvider){
// 	$routeProvider
// 	.when('/plan', {
// 		templateUrl: 'views/plan.html',
// 		controller: 'MyPlanCtrl'
// 	})
// 	.when('/history',{
// 		templateUrl: 'views/history.html',
// 		controller: 'HistoryCtrl'
// 	})
// 	.when('/bookMarker',{
// 		templateUrl: 'views/bookMarker.html',
// 		controller: BookMarkerCtrl,
// 	    resolve: BookMarkerCtrl.resolve
// 	})
// 	.when('/setting',{
// 		templateUrl: 'views/setting.html',
// 		controller: 'SettingCtrl'
// 	})
// 	.otherwise({
// 		redirectTo: '/plan'
// 	})
// }])
var app = angular.module("app", ["ui.router"]);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.when("","/login");

    $stateProvider
        .state("index",{
            url: "/index",
            templateUrl:"index.html"
        })
        .state("index.plan",{
            url: "/plan",
            templateUrl: 'views/plan.html',
            controller: 'MyPlanCtrl'
        })
        .state("index.history",{
            url: "/history",
            templateUrl: 'views/history.html',
            controller: 'HistoryCtrl'
        })
        .state("index.bookMarker",{
            url: "/bookMarker",
            templateUrl: 'views/bookMarker.html',
            controller: BookMarkerCtrl,
            resolve: BookMarkerCtrl.resolve
        })
        .state("index.setting",{
            url: "/setting",
            templateUrl: 'views/setting.html',
            controller: 'SettingCtrl'
        })
        // login中默认某一视图打开？
        .state("login",{
            url: "/login",
            templateUrl: "login/login.html"
        })
        .state("login.login",{
            url: "/login",
            templateUrl: "login/login1.html"
        }) 
        .state("login.register",{
            url:"/register",
            templateUrl: "login/register.html"
        })
}]);

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
// $http error也是要有处理的；
function BookMarkerCtrl($scope, getBookMarker) {
    $scope.isContainsShow = false;
    $scope.isBmLoad = false;

    getBookMarker.get("scripts/bookMarker.php").success(function (data) {
        $scope.userInfo = data;
        $scope.bmNum = data.length;
        $scope.isBmLoad = true;
    })

    $scope.hideAddBMDiv = true;
    $scope.showAddBMDiv = false;

    $scope.addBookMarkerShow = function () {
        $scope.showAddBMDiv = true;
    }

    $scope.hiddenBookMarker = function () {
        $scope.showAddBMDiv = false;
    }

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
}

BookMarkerCtrl.resolve = {
    delay: function ($q) {
        var delay = $q.defer();
        var load = function () {
            $.getScript("scripts/directives/userDirective.js", function () {
                delay.resolve();
            });
        };
        load();
        // console.log("resolve onload");
        return delay.promise;
    }
}

app.controller("urlAddCtrl",['$scope', '$http', '$state', function($scope, $http, $state){

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
        })
    }

    $scope.adsFoucs = function(){
        $scope.error = {
            urlName : "",
            url : ""
        }
    }

}])

app.controller('loginCtrl', function($scope, $http, $state){
    
    $scope.Login = {};
    $scope.Login.isLogin = true;

    $scope.toggleTab = function(isLogin){
        if($scope.Login.isLogin){
            if(!isLogin){
                $scope.Login.isLogin = false;
            }
        }else{
            if(isLogin){
                $scope.Login.isLogin = true;
            }
        }
    };

    $scope.Login.Lerror = "";
    $scope.Login.Rerror = "";

    $scope.formData = {};

    $scope.processForm = function(){
        console.log($.param($scope.formData));
        console.log("start");
        $http({
            method: "post",
            url: "login/judge.php",
            data: $.param($scope.formData),
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        })
        .success(function(data){
            console.log(data);
            $state.go("index",{},{reload:true});
        })
    }

});

