<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>login</title>
	<link rel="stylesheet" type="text/css" href="../css/login.css"></link>
	<link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css">
	<style>[ng-cloak] { display: none; }</style>
</head>
<body ng-app="appLogin" ng-controller="loginCtrl">
	<div id="login_body">
		<header id="login_center">
			<div id="login_log"><img src="../img/logo.jpg" alt="logo" style="width:300px;height:100px;"/></div>
			<div id="login_left">slide滚介绍图片</div>
			
			<div id="login_right" ng-class="{login_L: Login.isLogin, login_R: !Login.isLogin}">
				<div id="login_tab">
					<div id="login_btn" ng-click="toggleTab(true)" ng-class="{login_LAtab: !Login.isLogin, login_Lcommontab: Login.isLogin}">用户登录</div>
					<div id="register_btn" ng-click="toggleTab(false)" ng-class="{login_RAtab: Login.isLogin, login_Rcommontab: !Login.isLogin}">注册</div>
				</div>
				<div id="login_main" ng-cloak>
					<div ng-hide="Login.isLogin">
						<form method="post" action="judge.php">
				 			<p class="login_lp login_rp">用户名</p>
							<input type="text" name="register_name" id="username" placeholder="请输入邮箱或用户名" class="login_input" maxLength="20" autofocus required/>
							<p class="login_lp login_rp">密码</p>
							<input type="password" name="password" id="password" placeholder="请输入密码" class="login_input" required/>	
							<p class="login_lp login_rp">再次输入密码</p>
							<input type="password" placeholder="请再次输入密码" id="repassword" class="login_input" required/>	
							<input type="submit"  id="register_submit" value="注册" class="submit  btn btn-warning"/>
							<span class="err">{{Login.Rerror}}</span>
							<span id="err3" class="err"></span>
							<div class="clearFloat"></div>
							<!-- 注册成功，5秒后转到主页 -->
						</form>
					</div> 

					<div ng-hide="!Login.isLogin">
						<form method="post" action="judge.php">
							<p class="login_lp">用户名</p>
							<input type="text" name="login_name" id="login_name" placeholder="请输入邮箱或用户名" class="login_input" autofocus required/>
							<p class="login_lp">密码</p>
							<input type="password" name="login_password" id="login_password" placeholder="请输入密码" class="login_input" required/>	
							<input type="submit" id="login_submit" value="登录" class="submit btn btn-primary"/>
							<span class="err">{{Login.Lerror}}</span>	
							<span id="err1" class="err">
							<?php 
								@$err = $_GET['id'];
								if(isset($_GET['id'])){
									echo "用户名或密码错误！";
								}
							?>
							</span>
							<div class="clearFloat"></div>	
						</form>		
					</div>
				</div>
			</div>
		</header>
		
		<footer id="login_bottom">
			<div id="login_foot">
				<p>二维码和其他介绍信息</p>
				<p>欢迎加入plan.com！！！</p>
				<p>友情链接：</p>
				<a href="http://www.baidu.com/">百度一下</a>
				<a href="http://www.tongji.edu.cn/">同济大学</a>
				<a href="https://github.com/wolful">fork me in github</a>
			</div>
		</footer>
	</div>
	<script type="text/javascript" src="../scripts/auxiliary.js"></script>
	<script type="text/javascript" src="../scripts/login.js"></script>
	<script src="../lib/angular/angular.js"></script>
	<script src="../lib/angular/angular-route.min.js"></script>
	<script type="text/javascript" src="../scripts/controllers/loginCtrl.js"></script>
</body>
</html>