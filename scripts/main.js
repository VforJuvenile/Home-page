// 获取浏览器每页高度
var pageHeight = document.documentElement.clientHeight;

var page1 = document.getElementById("page1"),
	page2 = document.getElementById("page2"),
	page3 = document.getElementById("page3");

page1.style.height = pageHeight + "px";
page2.style.height = pageHeight + "px";
page3.style.height = pageHeight + "px";

