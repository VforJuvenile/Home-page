var app = angular.module("app", ["ui.router"]);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    
    
    $urlRouterProvider.when("","/login");

    $stateProvider
        .state("index",{
            url: "/index",
            templateUrl:"views/index.html",
            controller: "indexCtrl"
        })
        
        .state("index.history",{
            url: "/history",
            views: {
                '' : {
                    templateUrl : "views/history.html",
                    controller: "HistoryCtrl"
                },
                'index':{
                    templateUrl: "views/history.html",
                    controller: "HistoryCtrl"
                }
            }
        })
        .state("index.plan",{
            url: "/plan",
            views: {
                '' : {
                    templateUrl : "views/plan.html",
                    controller: "MyPlanCtrl"
                },
                'index':{
                    templateUrl: "views/plan.html",
                    controller: "MyPlanCtrl"
                }
            }
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
            views: {
                "login": {
                    templateUrl: "views/login.html"
                }
            }
        }) 
        .state("login.register",{
            url:"/register",
            views: {
                "login": {
                    templateUrl: "views/register.html",
                    controller: "registerCtrl"
                }
            }
        });

    // 注意格式
    $urlRouterProvider.otherwise('/login/login');
}]);

app.run(function($rootScope,$state){
    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){   
        console.log("change");
        console.log(fromState);
        console.log(toParams);
        // console.log(sessionStorage.getItem("userName"));
        // if(sessionStorage.getItem("userName") == null){
        //     // event.preventDefault();
        //     console.log("go login");
        //     $state.go("login",{},{reload : false});
        // }
    });
});

app.controller('bodyCtrl', function($scope){
	$scope.homeShow = true;
    $scope.userName = sessionStorage.getItem("userName");
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
		    id: "plan"
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
    console.log("enter pplan"); 
	 $http.get("scripts/plan.php?a=b").success(function(data){
	 	$scope.user = data;
	 })
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

app.controller("urlAddCtrl",['$scope', '$http', '$state', function($scope, $http, $state){

    $scope.urlName = ""; 
    $scope.url = "";
    $scope.error = {
        urlName : "",
        url : ""
    }

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

    $state.go("login.login", {}, {reload: false});

    $scope.Login.Lerror = "";
    $scope.formData = {};

    $scope.processForm = function(){
        // 校验
        $http({
            method: "post",
            url: "login/judge.php",
            data: $.param($scope.formData),
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        })
        .success(function(data){
            if(data == "success"){
                sessionStorage.setItem("userName", $scope.formData.login_name);
                $state.go("index", {}, {reload: true});
            }else{
                $scope.Login.Lerror = data;
            }
        })
        .error(function(data){
            $scope.Login.Lerror = "网络连接错误！";
        })
    }

});

app.controller("registerCtrl", function($scope, $http, $state){

    $scope.registerData = {};
    $scope.registerData.register_name = "";
    $scope.Login.Rerror = "";
    $scope.rePassword = "";

    $scope.registerForm = function(){
        // 合法性校验
        $http({
            method: "post",
            url : "login/judge.php",
            data: $.param($scope.registerData),
            headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
        })
        .success(function(data){
            if(data == "success"){
                $state.go("index", {}, {reload: true});
            }else{
                $scope.Login.Rerror = data;
            }
        })
        .error(function(data){
            $scope.Login.Rerror = "网络连接错误！";
        })
    };

    $scope.$watch("registerData.register_name", function(value){
        $http({
            method: "get",
            url : "login/judge.php?name="+value
        })
        .success(function(data){
            if(data !== "success"){
                $scope.Login.Rerror = data;
            }else{
                $scope.Login.Rerror = "";
            }
        })
        .error(function(){
            scope.Login.Rerror = "网络连接错误！";
        })
    });

    $scope.$watch("rePassword", function(value){
        if(value != ""){
            if($scope.registerData.password != value){
                $scope.Login.Rerror = "两次密码不匹配！";
            }else{
                $scope.Login.Rerror = "";
            }
        }
    });
})

app.controller("indexCtrl", function($scope, $state){
    $state.go("index.history", {}, {reload: false});
})
