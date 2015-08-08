<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>login</title>
	<link rel="stylesheet" type="text/css" href="../css/login.css"></link>
	<link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css">
</head>
<body>
	<div id="login_body">
		<div id="login_center">
			<div id="login_log"><img src="../img/logo.jpg" alt="logo" style="width:300px;height:100px;"/></div>
			<div id="login_left">滑动介绍图片</div>
			<div id="login_right">
				<div id="login_tab">
					<div id="login_btn" style="color:orange">用户登录</div>
					<div id="register_btn" style="background:#FA9303;color:white">注册</div>
				</div>

				<form action="judge.php" method="post" >
				 	<p class="usernameP usernameP2">用户名</p>
					<input type="text" name="register_name" id="username" placeholder="请输入邮箱或用户名" class="login_input" required/>
					<p class="usernameP usernameP2">密码</p>
					<input type="password" name="password" id="password" placeholder="请输入密码" class="login_input" required/>	
					<p class="usernameP usernameP2">再次输入密码</p>
					<input type="password" placeholder="请再次输入密码" id="repassword" class="login_input" required/>	
					<!-- <input type="hidden" name="flag1" /> -->
					<input type="submit"  id="register_submit" value="注册" class="submit  btn btn-warning"/>
				</from> 
				<!-- 注册成功，5秒后转到主页 -->
				
				<span id="err3" class="err"></span>
				<span class="err"></span>
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
		</div>


	</div>
	<script type="text/javascript" src="../scripts/auxiliary.js"></script>
	<script type="text/javascript" src="../scripts/login.js"></script>
</body>
</html>