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

.directive('bmBlocks', ["$timeout","drawBlock", function($timeout, drawBlock){

	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		templateUrl: 'views/bookMarkerBlocks.html',
		link: function(scope, element, attrs){

			// 计算得其父元素的宽度，普通获取为auto
			var sideBarW = angular.element("#sidebar").outerWidth(true),
				bodyW = angular.element("body")[0].clientWidth,
				padding = parseFloat(angular.element("#mainContain").css("padding")),
				bmsW = bodyW - sideBarW - 2*padding - 17;  // not IE scroll

			// 监测$http数据是否从后台获取完毕,显示
			// 之所以在directive检测isLoad，是因为不能在尚未加载完成的时候绘制
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

.directive("bmItems", function($timeout){
	return {
		restrict: "E",
		replace: true,
		templateUrl: "views/bookMarkerItems.html",
		link: function(scope, element, attrs){

			scope.count = 1;
			scope.$watch(attrs.isLoad, function(value){
				if(value == true){
					$timeout(function(){
							
						
					}, 0);
				}
			})

		}
	}
})

// 左侧siderbar高度适应
.directive("adpatHeight", function($timeout){
	return {
		link: function(scope, element, attrs){
			var doc = document, 
				header = doc.querySelectorAll("#userHeader")[0],
				pageHeight = Math.max(doc.documentElement.clientHeight, doc.body.clientHeight),
				siderHeight = pageHeight - header.offsetHeight;

			element[0].style.height = siderHeight + "px";

			// 浏览器窗口改变监听事件--高度不需要
			// window.addEventListener("resize", function(){
			// 	$timeout(function(){
			// 		pageHeight = Math.max(doc.documentElement.scrollHeight, doc.body.clientHeight);
			// 		console.log(pageHeight);
			// 	},0);
			// })

		}
	}
})
