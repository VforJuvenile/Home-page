// 获取所有书签信息
app.factory("siderbar", function(){

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
	return $resource('/Home-page/scripts/bookMarker.php/id/:id',{ id: '@id'});
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

.factory("bmBlocks", ["lStorage", function(lStorage){
	var allBms = [],
		secondaryArr = [];
	return {
		getMain: function(all, key){
			var lArr = lStorage.get("mainBm"),
				mainBm = [],
				i = 0;

			console.log(all.length);
			if (!all.length){
				return [];
			}

			for (var j = 0, len = lArr.length; j < len; j++) {
				i = 0;
				while (all[i]) {
					if (all[i][key] == lArr[j]) {
						mainBm.push(all.splice(i, 1));
						break;
					} else {
						i++;
					}
				}
			}

			secondaryArr = all;

			return mainBm;
		},
		getSecondary: function(){
			return secondaryArr;
		}
	}
}])

.factory("lStorage", function(){
	return {
		get: function(name){
			return JSON.parse(window.localStorage.getItem(name) || "[]");
		},
		set: function(name, value){
			window.localStorage.setItem(name, value);
		}
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

// .filter("getShortBM", ["strOperation", function(strOperation){
// 	return function(bms){
// 		angular.forEach(bms, function(bms, index){
// 			console.log(strOperation.isChinese(bms["markerName"][0]) ? bms["markerName"].length < 6 : bms["markerName"].length < 10);
// 			return strOperation.isChinese(bms["markerName"][0]) ? bms["markerName"].length < 6 : bms["markerName"].length < 10;
// 		});
// 	}
// }])