// require.js
EventUtil = {
	addHandler: function(ele, handler, type){
		if(ele.addEventListener){
			ele.addEventListener(type, handler, false);
		}else if(ele.attachEvent){
			ele.attachEvent("on" + type, handler);
		}else{
			ele["on" + type] = handler;
		}
	},
	removeHandler: function(ele, handler, type){
		if(ele.removeEventListener){
			ele.removeEventListener(type, handler, false);
		}else if(ele.detachEvent){
			ele.detachEvent("on" + type, handler);
		}else{
			ele["on" + type] = null;
		}
	},
	getEvent: function(event) {
		return event || window.event;
	},
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	getWheelDelta: function(event){
		// return 1;
		if(event.wheelDelta){
			// var aa = client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta;
			var aa = event.wheelDelta;
			// alert(aa);
			return aa;
		}else{
			return -event.detail * 40;
		}
	}
};

function createXHR(){
	if(typeof XMLHttpRequest != "undefined"){
		// alert("xml");
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject != "undefined"){
		if(typeof arguments.callee.activeXString != 'string'){
			var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"], i, len;

			for(i = 0, len = versions.length; i < len; i++){
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				}catch(ex){
					// do nothing
				}
			}

		}
		return new ActiveXObject(arguments.callee.activeXString);
	}else{
		throw new Error("存在错误");
	}
	
}