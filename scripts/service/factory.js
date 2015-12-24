// 获取所有书签信息
app.factory('getBookMarker', function($http){
	return {
		get: function(url){
			return $http.get(url);
		},
		post: function(url){
			return $http.post(url);
		}
	}
})

.factory("findChildIndex", function(){
	return {
		getIndex: function(ele){
			var lens = ele.parent().children();
			console.log(lens.length);
			for (var i = 0, len = lens.length; i < len; i++){
				if(lens[i] == ele){
					return i;
				}
			}
			return 0;
		}
	};
})

.factory("drawBlock", function(){
	return {
		draw: function(element, perObj, pubObj){
			element.css({
				"position": absolute,
				"width": pubObj.width,
				"height": pubObj.height,
				"margin": pubObj.margin,
				"left": pubObj.left,
				"top": pubObj.top
			})
		}
	}
})