(function(){
// 初始化页面
// 设置绑定事件

var perPage = document.querySelectorAll("div.page");
var fixedUl = document.getElementById("fixedUl");
// 根据时间来调整页面的颜色
// 也可设置为自我调整
// perPage[0].style.background = "url(img/beautifulNight.jpg)";

var pageWidth = window.screen.width > 700 ? window.screen.width: 700;
var pageHeight = document.documentElement.clientHeight > 610 ? document.documentElement.clientHeight : 616;
for(var i =0, len = perPage.length; i < len; i++){
	perPage[i].style.height = pageHeight + "px";
}

// page3
var userHeader = document.getElementById("userHeader"),
 	contain = document.getElementById("contain"),
	userbar = document.getElementById("sidebar"),
	mainContain = document.getElementById("mainContain"),
	offsetHeight = document.getElementById("offsetHeight");
var headerHeight = document.defaultView.getComputedStyle(userHeader,null).height;
var page3ContainHeight = pageHeight - parseFloat(headerHeight);
userbar.style.height = page3ContainHeight - 3 +"px";
mainContain.style.height = page3ContainHeight - 3 +"px";

// page1时间显示
document.getElementById("nowTime").innerHTML = getNowTime();
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