angular.module("register", [])
.controller("registerCtrl", function($scope, $http, $state){

    $scope.registerData = {};
    $scope.registerData.register_name = "";
    $scope.Login.Rerror = "";
    $scope.rePassword = "";

    $scope.registerForm = function(){
        // 合法性校验
        $http({
            method: "post",
            url : "scripts/judge.php",
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
            url : "scripts/judge.php?name="+value
        })
        .success(function(data){
            if(data !== "success"){
                console.log("errr");
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