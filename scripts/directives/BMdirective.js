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

.directive("childrenAdaptWidth", function(){
	return {
		restrict: 'AE',
		link: function(scope, element, attrs){
			element.bind("DOMNodeInserted", function(){
				console.log("c="+element.children().length);
			});
		}
	}
})

.directive('adaptwidth', function(){

	return {
		restrict: 'E',
		template: "<span ng-transclude></span>",
		transclude: true,
		link: function(scope, element, attrs){
			console.log("w");
			var num = element.css("left");
			console.log(num);
			// 遍历每一个元素
			var elementSiblings = element.parent().children();
			for(var i = 0; i < elementSiblings.length; i++){

				var left = i * 100 + "px";
				elementSiblings.eq(i).css({
					"left": left, 
					"border": "1px solid blue",
					"width": "100px"
				});

			}
		}

	}
})