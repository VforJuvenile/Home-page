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
.directive('adaptwidth', ["findChildIndex","drawBlock", function(findChildIndex, drawBlock){

	return {
		restrict: 'E',
		template: "<span ng-transclude></span>",
		transclude: true,
		link: function(scope, element, attrs){
			
			var perObj = {};
			var elementSiblings = element.parent().children();
			if(elementSiblings.length == scope.bmNum)
				var blocks = scope.block;
				console.log(element.parentNode);
				console.log(element.parent().css("width"));
				// for(var i = 0; i < elementSiblings.length; i++){

				// 	perObj = scope.blockObj(i);
				// 	drawBlock.draw(element, perObj, blocks);
				// }
			}
		}
	}
])

.directive("childrenAdaptWidth", function(){
	return {
		restrict: 'AE',
		link: function(scope, element, attrs){
			element.bind("DOMNodeInserted", function(){

			});

		}
	}
})

.directive("whatto", function(){
	return {
		restrict: "E",
		template: "<span></span>",
		link: function(scope, element, attrs){
			var ele = element;
			console.log(ele.parent().children().length);
			console.log("a");
		}
	}
})