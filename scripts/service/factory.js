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
.factory("drawBlock", function(){
	return {
		draw: function(element, perObj){
			var styleStr = "position: absolute;width:"+perObj.width+"px;height:"+
							perObj.height+"px;left:"+perObj.left+"px;top:"+perObj.top+
							"px;border:"+perObj.border;
			element.style.cssText = styleStr; 
		}
	}
})