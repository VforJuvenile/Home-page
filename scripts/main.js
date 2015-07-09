// 获取浏览器每页高度
var pageHeight = document.documentElement.clientHeight;

var page1 = document.getElementById("page1"),
	page2 = document.getElementById("page2"),
	page3 = document.getElementById("page3");

page1.style.height = pageHeight + "px";
page2.style.height = pageHeight + "px";
page3.style.height = pageHeight + "px";

var span1 = document.getElementById("fixedSpan11");
var span2 = document.getElementById("fixedSpan12");
var span3 = document.getElementById("fixedSpan13");

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
	}
};

var handler1 = function(){
	// alert("aa");
	page1.scrollIntoView(ture);
};

EventUtil.addHandler(span1, handler1, "click");

