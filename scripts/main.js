(function(){
// 初始化页面
// 设置绑定事件

// div.page中间不能有空格
var perPage = document.querySelectorAll("div.page");
var fixedUl = document.getElementById("fixedUl");

var pageWidth = window.screen.width - 17;
var pageHeight = document.documentElement.clientHeight > 610 ? document.documentElement.clientHeight : 616;
document.getElementById("nowTime").innerHTML = getNowTime();
document.getElementById("nameWelcome").innerHTML = "Welcome to you! Wufu";
var timeAndNameDiv = document.getElementById("timeAndName");
var timeAndNameDivWidth = parseFloat(document.defaultView.getComputedStyle(timeAndNameDiv,null).width);
timeAndNameDiv.style.left = (pageWidth/2 - timeAndNameDivWidth/2)+ "px";


// angular.js
// setInterval(function(){
// 	document.getElementById("nowTime").innerHTML = getNowTime();
// }, 1000);
// 设置每页高度与浏览器高度一致
for(var i = 0; i < perPage.length; i++){
	perPage[i].style.height = pageHeight + "px";
	perPage[i].style.width = pageWidth + "px";
};

// fixedUl
// 设置事件监控页面的滚动，再更改span的背景颜色
fixedUl.style.top = pageHeight*(0.6) + "px";
for(var i = 0; i < fixedUl.childNodes.length; i++){
	EventUtil.addHandler(fixedUl.childNodes[i], spanHandler, "click");
};
// 滚轮
EventUtil.addHandler(document, windowScrollHandler, "mousewheel");
EventUtil.addHandler(document, windowScrollHandler, "DOMMouseScroll");


function getNowTime(){
	var myTime = new Date();
	var nowTimeMinute = (myTime.getMinutes() < 10) ? "0" + myTime.getMinutes() : myTime.getMinutes();
	var nowTime = myTime.getHours() +":" + nowTimeMinute;
	return nowTime;
}

function spanHandler(e){
	// alert("a");
	var e = EventUtil.getEvent(e);
	var target = EventUtil.getTarget(e);
	var num;
	if(target.nodeName.toLowerCase() == "span"){
		num = target.innerText ? target.innerText : textContent;
		window.scrollTo(0, (num-1)*pageHeight);
	};
}

function windowScrollHandler(e){
	// alert("a");
	var event = EventUtil.getEvent(e);
	// alert(event);
	// var target = EventUtil.getTarget(e);
	var dir = EventUtil.getWheelDelta(event);

	judgeScrollPosition(dir);
	
}

function judgeScrollPosition(dir){
	var scroll = document.documentElement.scrollTop || document.body.scrollTop;
	// why 100? 滚轮移动一次的高度
	// 应该以慢速滑动到位置，而不是一闪而过
	if(dir > 0){
		// alert(dir);
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
			// window.scrollTo(0, -10); 
			// window.scrollTo(0,0);
		}
	};

	return scroll;
}


})();