angular.module("plan", [])
.controller('MyPlanCtrl', function($scope,$http){
    console.log("enter pplan"); 
	 $http.get("scripts/plan.php/aa?a=b").success(function(data){
	 	$scope.user = data;
	 })
})