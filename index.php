<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>个人首页</title>
	<link rel="stylesheet" type="text/css" href="css/main.css" >
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
	<script type="text/javascript" src="lib/jquery-2.1.3.min.js"></script>
	<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
	<script src="lib/angular/angular.js"></script>
	<style>[ng-cloak] { display: none; }</style>
</head>
<body ng-app="app" ng-controller="bodyCtrl">
	
		
	<!-- 登陆界面由另外主页切入 -->
	<!-- 另外主页用来介绍系统功能 -->
	<!-- 日历和时间采用浮框模态来解决 -->
	<!-- 匿名登录，个人信息为空，其他菜单不见 -->
	<!-- 虽然可以添加计划，但无法保存到数据库 -->
	<!-- 在线预览文件 -->
	<!-- 多尺寸屏幕适应 -->
	<!-- 邮件提醒 -->
	<!-- 闹钟，番茄工作法 -->
	<!-- 下一步工作计划 -->
	<!-- 1、找到浏览器的书签接口，导出或导入 -->
	<!-- 2、若没有，则在本地数据库导入导出 -->


	<div id="page1" class="page" style="z-index:20;" ng-hide="homeShow">
		<button type="button" class="btn btn-default" ng-click="timeShow()" title="主页">
  			<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
		</button>
		<div id="timeAndName">
			<div id="nowTime"></div>
			<div id="nameWelcome"><?php echo "Welcome to you! ".$_SESSION['user_id']?></div>
		</div>
	</div>

	<div id="page3" class="page" ng-controller="siderClick" ng-show="homeShow">
	  
		<div id="userHeader">
			网站标签和小工具栏
			<a href="login/login.php">退出登录</a>
			<button type="button" class="btn btn-default" ng-click="timeHide()" title="显示时间">
  				<span class="glyphicon glyphicon-time" aria-hidden="true"></span>
			</button>
		</div>
		
		<div id="contain">
			<div id="sidebar">
				<div id="userInfo">
					<img src="img/person.png" id="personPhoto"></img>
					<!-- <p><?php echo $_SESSION['user_id']?></p>
					<?php echo $_SESSION['user_IdNum']?> -->
					
				</div>
				<div ng-repeat="name in siderbarList" class="sideOptions">
					<a ui-sref=".{{name.id}}">{{name.xuhao}}</a>
				</div>
			</div>
			<div id="mainContain" ng-View>
			</div>
			<div class="clearFloat"></div>
		</div> 
	</div> 

	<!--<script src="lib/angular/angular-route.min.js"></script>-->
	<script src="lib/angular/angular-ui-router.js"></script>
	<script type="text/javascript" src="scripts/auxiliary.js"></script>
	<script type="text/javascript" src="scripts/main.js"></script>
	<script type="text/javascript" src="scripts/mainCtrl.js"></script>
	<script type="text/javascript" src="scripts/service/factory.js"></script>
	<script type="text/javascript" src="scripts/directives/BMdirective.js"></script>
</body>
</html>