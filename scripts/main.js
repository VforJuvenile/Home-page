(function(){
// 初始化页面
// 设置绑定事件

// div.page中间不能有空格
var perPage = document.querySelectorAll("div.page");
var fixedUl = document.getElementById("fixedUl");
// perPage[0].style.background = "url(img/beautifulNight.jpg)";

var pageWidth = window.screen.width > 700 ? window.screen.width: 700;
var pageHeight = document.documentElement.clientHeight > 610 ? document.documentElement.clientHeight : 616;
for(var i =0, len = perPage.length; i < len; i++){
	perPage[i].style.height = pageHeight + "px";
	perPage[i].style.width = pageWidth + "px";
}

// page3
var userHeader = document.getElementById("userHeader"),
 	contain = document.getElementById("contain"),
	userbar = document.getElementById("sidebar"),
	mainContain = document.getElementById("mainContain"),
	offsetHeight = document.getElementById("offsetHeight");
var headerHeight = document.defaultView.getComputedStyle(userHeader,null).height;
var sidebarWidth = document.defaultView.getComputedStyle(mainContain, null).left;
var page3ContainHeight = pageHeight - parseFloat(headerHeight);
userHeader.style.width = pageWidth + "px";
userbar.style.height = page3ContainHeight - 3 +"px";
contain.style.width = pageWidth + "px";
mainContain.style.width = (pageWidth - parseFloat(sidebarWidth)) + "px";
mainContain.style.height = page3ContainHeight - 3 +"px";

// page1时间显示
document.getElementById("nowTime").innerHTML = getNowTime();
document.getElementById("nameWelcome").innerHTML = "Welcome to you! Wufu";
var timeAndNameDiv = document.getElementById("timeAndName");
var timeAndNameDivWidth = parseFloat(document.defaultView.getComputedStyle(timeAndNameDiv,null).width);
timeAndNameDiv.style.left = (pageWidth/2 - timeAndNameDivWidth/2)+ "px";
// angular.js
setInterval(function(){
	document.getElementById("nowTime").innerHTML = getNowTime();
}, 1000);

function getNowTime(){
	var myTime = new Date();
	var nowTimeMinute = (myTime.getMinutes() < 10) ? "0" + myTime.getMinutes() : myTime.getMinutes();
	var nowTime = myTime.getHours() +":" + nowTimeMinute;
	return nowTime;
}





})();