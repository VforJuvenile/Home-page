angular.module("login", [])
.controller('loginCtrl', function($scope, $http, $state){
    
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
            url: "scripts/judge.php",
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


    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    $scope.addSlide = function() {
        var newWidth = 600 + slides.length + 1;
        slides.push({
          image: 'img/' + newWidth + ".jpg",
          text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
          id: currIndex++
        });
    };

    for (var i = 0; i < 4; i++) {
        $scope.addSlide();
    }


});