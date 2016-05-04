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

// 左侧siderbar高度适应
.directive("adpatHeight", function($timeout){
	return {
		link: function(scope, element, attrs){
			var doc = document, 
				header = doc.querySelectorAll("#userHeader")[0],
				pageHeight = Math.max(doc.documentElement.clientHeight, doc.body.clientHeight),
				siderHeight = pageHeight - header.offsetHeight;

			element[0].style.height = siderHeight + "px";

		}
	}
})