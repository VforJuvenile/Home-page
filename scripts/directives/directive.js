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

.directive("dbOpen", ["BookMarker", function(BookMarker){
	return {
		restrict: "A",
		scope: {
			dbOpen: "&"
		},
		link: function(scope, element, attrs){
			var tid, so = scope.dbOpen();

			element[0].addEventListener("mouseenter", function(e){
				var target = e.target;
				angular.element(target).contents("i").removeClass('hide');
				
			});

			element[0].addEventListener("mouseleave", function(e){
				var target = e.target;
				angular.element(target).contents("i").addClass('hide');
			});
			
			element.contents("i").bind("click", function(e){
				// 编辑书签	
				so('sm', {"id": attrs.tid, "markerName": attrs.tname, "markerUrl": attrs.title});


				// var de = BookerMarker.$delete({"id": attrs.tid});
				// de.$promise.then(function success(){
				// 	console.log("success");
				// 	$state.go($state.current.name, {}, {reload: true});
				// }, function error(){
				// 	console.log("error delete");
				// })


			})
		}
	}
}])