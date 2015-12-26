// angular自动聚焦
app.directive('focusMe', function($timeout, $parse){

	return {
		link: function(scope, element, attrs){
			var model = $parse(attrs.focusMe);
			scope.$watch(attrs.focusMe, function(value){
				if(value === true){
					$timeout(function(){
						element[0].focus();
					});
				}
			});
		}
	}
})

.directive("focusChange", function(){
	return {
		link: function(scope, element, attrs){
			element.bind("focus", function(){
				scope.error.urlName = "";
				scope.error.url = "";
			});
		}
	}
})

.directive('adaptWidth', ["$timeout","drawBlock", function($timeout, drawBlock){

	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		template: "<ul><li ng-repeat='name in userInfo' title='{{name.markerUrl}}' class='bookMarkerBlock'>"+
				  "<a target='_blank' ng-href='{{name.markerUrl}}'>{{name.markerName}}</a>"+
				  "</li><li id='extendHeight'></li></ul>",
		link: function(scope, element, attrs){

			// 计算得其父元素的宽度，普通获取为auto
			var sideBarW = angular.element("#sidebar").outerWidth(true);
				bodyW = angular.element("body")[0].clientWidth,
				padding = parseFloat(angular.element("#mainContain").css("padding")),
				bmsW = bodyW - sideBarW - 2*padding - 17;  // not IE scroll

			// 监测$http数据是否从后台获取完毕,显示
			scope.$watch(attrs.isLoad, function(value){
				if(value == true){
					$timeout(function(){
						var eleArr = element.children(),
							len = eleArr.length - 1,
							extendHeight = new scope.blockObj(len);
							
						// 以最后一个手动添加的元素来撑开父元素	
						angular.element("#extendHeight")[0].style.height = extendHeight.top + extendHeight.height + extendHeight.margin + "px";
						for (var i = 0; i < len; i++){
							var obj = new scope.blockObj(i, bmsW);
							drawBlock.draw(eleArr[i], obj)
						}
						scope.isContainsShow = true;
					}, 0);
				}
			})		

		}
	}
}])

