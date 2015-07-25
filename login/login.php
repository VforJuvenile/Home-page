<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>login</title>
	<link rel="stylesheet" type="text/css" href="../css/login.css"></link>
</head>
<body>
	<div id="login_body">
		<div id="login_center">
			<div id="login_log">log</div>
			<div id="login_left">滑动介绍图片</div>
			<div id="login_right">
				<div id="login_tab">
					<div>登录</div>
					<div>注册</div>
				</div>
				<!-- //
				// 	$name = $_POST['name'];
				// 	$password = $_POST['password'];
				// 	if((!isset)) -->
				<form>
					<input type="text" name="name" placeholder="请输入邮箱或用户名" class="login_input"/>
					<input type="password" name="password" placeholder="请输入密码" class="login_input"/>	
					<input type="submit" value="登录" class="submit"/>	
					
				</from>
				<form>
					<input type="text" placeholder="请输入邮箱或用户名" class="login_input"/>
					<input type="password" placeholder="请输入密码" class="login_input"/>	
					<input type="password" placeholder="请再次输入密码" class="login_input"/>	
					<input type="submit" value="注册" class="submit"/>

				</from>
				<div id="login_register"></div> 
			</div>
		</div>
		
		<div id="login_bottom">
			<div id="login_foot">二维码和其他介绍信息</div>
		</div>


	</div>
	<script type="text/javascript" src="../scripts/login.js"></script>
</body>
</html>