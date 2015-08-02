<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>个人首页</title>
	<link rel="stylesheet" type="text/css" href="css/main.css" >
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
</head>
<body ng-app="app">
	<?php
	
		@$name = $_POST['name'];
		if(!isset($_POST['name'])){
	?>
		<!-- <div >404！<a href="login/login.php">重新登陆</a><span><?php echo $name; ?></span></div>  -->
	<?php		
		}else{
	?>		
	<?php } ?>
		
	<!-- 使用单个页面来实现所有功能 -->
	<!-- 日历和时间采用浮框模态来解决 -->
	<!-- 登陆之前也可以使用模态，不进入主页 -->
	<!-- 匿名登录，个人信息为空，其他菜单不见 -->
	<!-- 虽然可以添加计划，但无法保存到数据库 -->
	<!-- 是否应该改成加载html文件，防止匿名F12 -->

	<div id="page1" class="page" style="z-index:20;display:none">

		<div id="timeAndName">
			<div id="nowTime"></div>
			<div id="nameWelcome"></div>
		</div>

	</div>

	<div id="page3" class="page"  ng-controller="siderClick">
	  
		<div id="userHeader">
			网站标签和小工具栏
			<a href="login/login.html">登陆</a>
		</div>
		
		<div id="contain">
				<div id="offsetHeight"></div>
				<div id="sidebar">
					<div id="userInfo">
						<img src="img/person.png" id="personPhoto"></img>
						<p>个人信息</p>
					</div>
					<!-- ng-click="showMessage(name.xuhao)"  -->
					<div ng-repeat="name in siderbarList" class="sideOptions">
						<a href="#/{{name.id}}">{{name.xuhao}}</a>
					</div>
				</div>
				<div id="mainContain" ng-View>
					<!-- 各个页面嵌套点 -->
				
				</div>
			</div> 
		</div>
	</div> 


	<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
	<script src="lib/angular/angular.js"></script>
	<script src="lib/angular/angular-route.min.js"></script>
	<script src="scripts/siderClick.js"></script>
	<script type="text/javascript" src="scripts/auxiliary.js"></script>
	<script type="text/javascript" src="scripts/main.js"></script>
	<script type="text/javascript" src="scripts/main1.js"></script>
</body>
</html>