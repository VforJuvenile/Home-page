// 初始化页面
// 设置绑定事件

// div.page中间不能有空格
var perPage = document.querySelectorAll("div.page");
var pageWidth = window.screen.width - 17;
var pageHeight = document.documentElement.clientHeight > 610 ? document.documentElement.clientHeight : 616;
var fixedUl = document.getElementById("fixedUl");

// 设置每页高度与浏览器高度一致
for(var i = 0; i < perPage.length; i++){
	perPage[i].style.height = pageHeight + "px";
	perPage[i].style.width = pageWidth + "px";
};

var spanHandler = function(e){
	// alert("a");
	var e = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(e);
	var num;
	if(target.nodeName.toLowerCase() == "span"){
		num = target.innerText ? target.innerText : textContent;
		window.scrollTo(0, (num-1)*pageHeight);
	};
};


// fixedUl
fixedUl.style.top = pageHeight*(0.6) + "px";
for(var i = 0; i < fixedUl.childNodes.length; i++){
	EventUtil.addHandler(fixedUl.childNodes[i], spanHandler, "click");
};
// 设置事件监控页面的滚动，再更改span的背景颜色

var windowScrollHandler = function(e){
	// alert("a");
	var event = EventUtil.getEvent(e);
	// alert(event);
	// var target = EventUtil.getTarget(e);
	var dir = EventUtil.getWheelDelta(event);

	judgeScrollPosition(dir);
	
};

EventUtil.addHandler(document, windowScrollHandler, "mousewheel");
EventUtil.addHandler(document, windowScrollHandler, "DOMMouseScroll");

function judgeScrollPosition(dir){
	var scroll = document.documentElement.scrollTop || document.body.scrollTop;
	// why 100
	// 应该以慢速滑动到位置，而不是一闪而过
	if(dir > 0){
		if(scroll <= pageHeight){
			window.scrollTo(100, 0);
		}else if(scroll < pageHeight * 2 && scroll > pageHeight){
			window.scrollTo(100, 0);
		}else{
			
			window.scrollTo(0, pageHeight +100);
		}
	}else{
		if(scroll < pageHeight){
			window.scrollTo(0, pageHeight-100);
		}else if(scroll <= pageHeight * 2 && scroll >= pageHeight){ 
			window.scrollTo(0, pageHeight*2);
		}else{
			// do nothing 
		}
	};

	return scroll;
}