<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>个人首页</title>
	<link rel="stylesheet" type="text/css" href="css/main.css" >
	<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css">
	<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
	<script src="lib/angular/angular.js"></script>
	<script src="scripts/siderClick.js"></script>
</head>
<body ng-app="app">
	
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
					<div ng-repeat="name in siderbarList" ng-click="showMessage(name.xuhao)" class="sideOptions">
						{{name.xuhao}}
					</div>
				</div>
				<div id="mainContain" >
					<!-- 各个页面嵌套点 -->
				
					<div id="newPage1" ng-show="flag[0]" class="newPage">
						<div ng-controller="page1">
							<div id="planNumber" class="">
								<p class="separateP">计划数</p>
								<ul>
									<li><span>总计划书</span><button>1</button></li>
									<li><span>今日未完成数</span><button>2</button></li>
									<li><span>今日已完成数</span><button>3</button></li>
								</ul>
							</div>
							<div id="calendar">
								<p class="separateP">日历</p>
								<div></div>
							</div>
							<div id="planTable">
								<p class="separateP">表格</p>
							</div>
							<div id="weather">
								<p class="separateP">天气状况</p>
							</div>
						</div>
					</div>

					<div id="newPage2" ng-show="flag[1]" class="newPage">
						<div ng-controller="page2">第二部分

						</div>
					</div>
					<div id="newPage3" ng-show="flag[2]" class="newPage">
						<div ng-controller="page3">第三部分 

						</div>
					</div>
					<div id="newPage4" ng-show="flag[3]" class="newPage">
						<div ng-controller="page3">第四部分

						</div>
					</div>
					
					
				</div>
			</div> 
		</div>
	</div> 
<?php
	
	@$name = $_POST['name'];
	if(!isset($_POST['name'])){
?>
	<!-- <div >表单name没有传过来</div> -->
<?php		
	}else{
		echo "name success";
	}
?>

	<script type="text/javascript" src="scripts/auxiliary.js"></script>
	<script type="text/javascript" src="scripts/main.js"></script>
</body>
</html>