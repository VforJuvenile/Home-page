var app = angular.module('app', []); 

app.controller('siderClick', function($scope){
	
	// sidebar标题
	$scope.siderbarList = [
		{
			xuhao : "个人计划"
		},{
			xuhao : "历史记录"
		},{
			xuhao : "书签"
		},{
			xuhao : "设置"
		}
	];

	$scope.flag = [true, false, false, false, false, false, false];

	
	$scope.setFlase = function(num, arr){
		for(var i = 0; i < arr.length; i++){
			arr[i] = false;
			if(num == i){
				arr[i] = true;
			};
			
		};
	};

	$scope.showMessage = function(xuhao){
		// if(a >2)
		// alert(a);
		// 能取到值，可做扩展
		
		switch(xuhao){
			case "个人计划": $scope.setFlase(0, $scope.flag);
				break; 
			case "历史记录":$scope.setFlase(1, $scope.flag);
				break;
			case "书签":$scope.setFlase(2, $scope.flag);
				break;
			case "设置":$scope.setFlase(3, $scope.flag);
				break;
		}
	};

});

app.controller('page1', function($scope){
	
});

app.controller('page2', function($scope){
	
});

app.controller('page3', function($scope){
	
});

app.controller('page4', function($scope){
	
});
