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

.directive('adaptWidth', ["findChildIndex","drawBlock", "$timeout", function(findChildIndex, drawBlock, $timeout){

	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		template: "<ul><li ng-transclude></li><li ng-repeat='name in userInfo' class='bookMarkerBlock'>"+
				  "<a target='_blank' ng-href='{{name.markerUrl}}'>{{name.markerName}}</a>"+
				  "</li></ul>",
		link: function(scope, element, attrs){
			
			// var perObj = {};
			// var elementSiblings = element.parent().children();
			// if(elementSiblings.length == scope.bmNum){

			// 	var blocks = scope.block;
			// 	// console.log(element.parentNode);
			// 	// console.log(element.parent().css());				
			// 	// service中绘画div应该只是绘制，而不应该处理逻辑和计算
			// 	// 获得父元素的一些样式只是为了方便子元素的绘制的计算
			// 	// for(var i = 0; i < elementSiblings.length; i++){
			// 	// 	perObj = scope.blockObj(i);
			// 	// 	drawBlock.draw(element, perObj, blocks);
			// 	// }
			// }
			// 
			// can not get parent's style
			$timeout(function(){
				console.log(element[0]);
				console.log($(element[0]).outerWidth());
				console.log(document.defaultView.getComputedStyle(element[0], null));
				console.log("e="+element[0].children.length);
			}, 0);
		}
	}
}])

