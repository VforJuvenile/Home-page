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
			// element.bind('blur', function(){
			// 	console.log("blur");
			// 	scope.$apply(model.assign(scope, false));
			// })
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

// 由于directive很早就加载了，
// 因此动态加载上去的子元素个数在开始加载的directive中是获得不到的
// 而且跟代码的位置无关
.directive('adaptwidth', function(){

	return {
		restrict: 'E',
		template: "<span ng-transclude></span>",
		transclude: true,
		link: function(scope, element, attrs){
			// var num = element.css("left");
			// 遍历每一个元素
			// 如果能获取该元素是父元素的第几个子元素就可以简化代码
			var index = element.parent().children().index(element);
			console.log("in="+index);
			var num = 0;
			var elementSiblings = element.parent().children();
			for(var i = 0; i < elementSiblings.length; i++){

				// var left = i * 100 + "px";
				// elementSiblings.eq(i).css({
				// 	"left": left, 
				// 	"border": "1px solid blue",
				// 	"width": "100px"
				// });
				// 
				num = scope.separateBlockByNum(i).x;
				// console.log("num="+num);

			}
		}

	}
})

.directive("childrenAdaptWidth", function(){
	return {
		restrict: 'AE',
		link: function(scope, element, attrs){
			element.bind("DOMNodeInserted", function(){
				// console.log("c="+element.children().length);
				
			});

		}
	}
})