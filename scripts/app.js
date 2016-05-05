var app = angular.module("app", ['ui.router', 'ngAnimate', 'ngResource', 'ui.bootstrap',
    'login', 'BookMarkers', 'notes', 'register', 'plan', 'history', 'wf.dragSort']);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.when("","/login");

    $stateProvider
        .state("index",{
            url: "/index",
            templateUrl:"templates/index.html",
            controller: "indexCtrl"
        })
        
        .state("index.history",{
            url: "/history",
            views: {
                '' : {
                    templateUrl : "templates/history.html",
                    controller: "HistoryCtrl"
                },
                'index':{
                    templateUrl: "templates/history.html",
                    controller: "HistoryCtrl"
                }
            }
        })
        .state("index.plan",{
            url: "/plan",
            views: {
                '' : {
                    templateUrl : "templates/plan.html",
                    controller: "MyPlanCtrl"
                },
                'index':{
                    templateUrl: "templates/plan.html",
                    controller: "MyPlanCtrl"
                }
            }
        })
        .state("index.bookMarker",{
            url: "/bookMarker",
            templateUrl: 'templates/bookMarker.html',
            controller: BookMarkerCtrl,
            resolve: {
                BookMarkers: function(MultiBMLoader){
                    return MultiBMLoader();
                }
            }
            // resolve: BookMarkerCtrl.resolve
        })
        .state("index.deBookMarker", {
            url: "/deBookMarker",
            templateUrl: 'templates/deBookMarker.html',
            controller: deBookMarker
        }),
        .state("index.setting",{
            url: "/setting",
            templateUrl: 'templates/setting.html',
            controller: 'SettingCtrl'
        })
        .state("index.notes",{
            url: "/notes",
            templateUrl: 'templates/notes.html',
            controller: 'notesCtrl'
        })
        .state("login",{
            url: "/login",
            templateUrl: "templates/login.html"
        })
        .state("login.login",{
            url: "/login",
            views: {
                "login": {
                    templateUrl: "templates/userLogin.html"
                }
            }
        }) 
        .state("login.register",{
            url:"/register",
            views: {
                "login": {
                    templateUrl: "templates/register.html",
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

        // console.log(sessionStorage.getItem("userName"));
        // if(sessionStorage.getItem("userName") == null){
        //     // event.preventDefault();
        //     console.log("go login");
        //     // aa++;
        //     $state.go("login.login",{}, {reload : true});
        // }
        
    });
})

.controller('bodyCtrl', function($scope){
	$scope.homeShow = true;
    $scope.userName = sessionStorage.getItem("userName");
	$scope.timeShow = function(){
		$scope.homeShow = true;
	}
	$scope.timeHide = function(){
		$scope.homeShow = false;
	}

})

.controller('siderClick', function($scope, $rootScope, siderbar){
	
    $scope.siderbarList = siderbar.get();

})

.controller("indexCtrl", function($scope, $state){
    // $state.go("index.history", {}, {reload: false});
})


