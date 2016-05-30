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
		},{
			xuhao: "API 文档",
			id: "api"
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

.factory("bmBlocks",  function(){
	var allBms = [],
		secondaryArr = [],
		deleteArr = [];
	return {
		getMain: function(all){
			var len = all.length, i = 0, mainArr = [], trans;

			while(all[i]){
				trans = all[i];
				trans["sortId"] = parseInt(trans["sortId"]);
				if (trans["state"] === "delete") {
					deleteArr.push(all.splice(i, 1)[0]);
				} else if (trans["sortId"] !== 0) {
					mainArr.push(all.splice(i, 1)[0]);
				} else {
					i++;
				}
			}

			secondaryArr = all;

			return mainArr;
		},
		getSecondary: function(){
			return secondaryArr;
		},
		getDelete: function(){
			return deleteArr;
		}
	}
})

.factory("lStorage", function(){
	return {
		get: function(name){
			return JSON.parse(window.localStorage.getItem(name) || "[]");
		},
		set: function(name, value){
			window.localStorage.setItem(name, JSON.stringify(value));
		},
		add: function(name, values){
			var newS;

			if (newS = JSON.parse(window.localStorage.getItem(name))) {
				newS = values;
			} else if (angular.isArray(values)){
				for (var i = 0, len = values.length; i < len; i++) {
					newS.push(values[i]);
				}
			} else {
				newS.push(values);
			}

			window.localStorage.setItem(name, JSON.stringify(newS));
			return newS;
		}
	}
})

.factory("ApiResource", ["$resource", function($resource) {
	return $resource('/Home-page/scripts/api.php/id/:id',{ id: '@id'});
}])

.factory("apiLoader", function(api, $q){
	return function(){
		var delay = $q.defer();
		// ApiResource.query(function(Apis){
		// 	delay.resolve(Apis);
		// }, function(){
		// 	delay.reject("获取Api失败！");
		// });
		setTimeout(function(){
			if (api.getAll()) {
				delay.resolve(api.getAll())
			} else {
				delay.reject("failed");
			}
		}, 1000);
		return delay.promise;
	}
})

.factory("api", function() {
	var api = [
		{
			"fileName": "sqlHelp.cs",
			"data": [
				{
					name: "executeOpertion",
					discription: "this is a sql help method",
					usage: "<p>this are place for coding.</p>",
					input: [["param1", "string", "必填"], ["param2", "number", "选填"]],
					output: [["value", "string", "必填"], []],
					notes: "ahahahahahhahah!",
					lastChangeTime: "2016-05-02 11:09:34",
					lastChangeBy: "wf"
				}
			],
		},
		{
			"fileName": "sqlHelp2.cs",
			"data": [
				{
					name: "executeOpertion2",
					discription: "this is a sql help method",
					usage: "<pre><p>this are place for coding.</p></pre>",
					input: [["param1", "string", "必填"], ["param2", "number", "选填"]],
					output: [["value", "string", "必填"]],
					notes: "ahahahahahhahah!",
					lastChangeTime: "2016-01-02 12:12:12",
					lastChangeBy: "wf2"
				}
			]
		},
		{
			"fileName": "sqlHelp3.cs",
			"data": [
				{
					name: "executeOpertion3",
					discription: "this is a sql help method",
					usage: "<pre><p>this are place for coding.</p></pre>",
					input: [["param1", "string", "必填"], ["param2", "number", "选填"]],
					output: [["value", "string", "必填"]],
					notes: "ahahahahahhahah!",
					lastChangeTime: "2016-01-02 12:12:12",
					lastChangeBy: "wf3"
				}
			]
		}
	];

	return {
		getApi: function (index){
			return api[index] || {};
		},
		getAll: function (){
			return api;
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
