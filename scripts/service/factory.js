// 获取所有书签信息
app.factory('getBookMarker', function($http){
	var allArr = [];
	return {
		get: function(url){
			return $http.get(url);
		},
		post: function(url){
			return $http.post(url);
		},
		getAllBm: function(url){
			this.get(url).success(function(data){
				allArr = data;
				console.log("new");
				console.log(data);
				return data;
			}).error(function(data){
				return data;
			});
		},
		deleteSomeBm: function(){
			return "";
		},
		addSomeBm: function(){
			return "";
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
})
.factory("arrayOperation", function(){
	var data = [];
	return {
		isArray: function(array){
			return Object.prototype.toString.call(array) == "[object Array]";
		},
		executeFilterFunc: function(array, key, func){
			if(this.isArray(array)){
				return array.filter(function(item){
					return func.call(null, item[key]); 
				})
			}else{
				return [];
			}
				
		}
	}
})
.factory("strOperation", function(){
	return {
		isChinese : function(temp){
			var re = /[^\u4e00-\u9fa5]/;
			if(re.test(temp))
				return false;
			return true;
		}
	}
})
.factory("note", function(){
	return {
		titles: [
			"wfffffffff",
			"sdfasdfasdfsdf",
			"wfwwffwef",
			"fdsdfsdfsgsdldsg"
		]
	}
})

.factory("BookMarker", function($resource){
	return $resource('/Home-page/scripts/bookMarker.php/:id',{ id: '@id'});
})

.factory("MultiBMLoader", function(BookMarker, $q){
	return function(){
		var delay = $q.defer();
		BookMarker.query(function(BookMarkers){
			delay.resolve(BookMarkers);
		}, function(){
			delay.reject("获取书签失败！");
		});
		return delay.promise;
	}
})
.filter("filter2", function(){
    return function(items, index){
        angular.forEach(items, function(item, i){
            item = item + index;
            console.log(item);
            items[i] = item;
        });

        return items;
    }
})