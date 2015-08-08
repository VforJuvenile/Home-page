<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>login</title>
	<link rel="stylesheet" type="text/css" href="../css/login.css"></link>
	<link rel="stylesheet" type="text/css" href="../css/difference.css"></link>
	<link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css">
</head>
<body>
	<div id="login_body">
		<div id="login_center">
			<div id="login_log"><img src="../img/logo.jpg" alt="logo" style="width:300px;height:100px;"/></div>
			<div id="login_left">滑动介绍图片</div>
			<div id="login_right">
				<div id="login_tab">
					<div id="login_btn" style="background:#337AB7;color:white">用户登录</div>
					<div id="register_btn" style="color:#337AB7">注册</div>
				</div>

				<form method="post" action="judge.php">
					<p class="usernameP">用户名</p>
					<input type="text" name="login_name" id="login_name" placeholder="请输入邮箱或用户名" class="login_input" autofocus required/>
					<p class="usernameP">密码</p>
					<input type="password" name="login_password" id="login_password" placeholder="请输入密码" class="login_input" required/>	
					<input type="submit" id="login_submit" value="登录" class="submit btn btn-primary"/>
					 
				</from>
				
				<span id="err1" class="err">
					<?php 
						@$err = $_GET['id'];
						if(isset($_GET['id'])){
							echo "用户名或密码错误！";
						}
					?>
				</span>
			</div>
		</div>
		
		<div id="login_bottom">
			<div id="login_foot">
				<p>二维码和其他介绍信息</p>
				<p>欢迎加入plan.com！！！</p>
				<p>友情链接：</p>
				<a href="http://www.baidu.com/">百度一下</a>
				<a href="http://www.tongji.edu.cn/">同济大学</a>
			</div>
			<!-- <button id="aa">as</button> -->
		</div>


	</div>
	<script type="text/javascript" src="../scripts/auxiliary.js"></script>
	<script type="text/javascript" src="../scripts/login.js"></script>
</body>
</html>