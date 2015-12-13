var appLogin = angular.module('appLogin', ['ngRoute']);

appLogin.controller('loginCtrl', function($scope){
	
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
});

