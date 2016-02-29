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
.factory("siderbar", function(){

	var siderbarList = [
		{
		    xuhao : "个人计划",
		    id: "plan"
		},{
		    xuhao : "历史记录",
		    id:"history"
		},{
		    xuhao : "书签",

		    id: 'bookMarker'
		},{
		    xuhao : "设置",
		    id:"setting"
		},{
			xuhao : "笔记",
			id: "notes"
		}
    ];
    return {
    	get: function(){
    		return siderbarList;
    	},
    	remove: function(n){
    		var aa = siderbarList.splice(n,1);
    		return siderbarList;
    	}
    }
});