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
			<div id="login_log">logo</div>
			<div id="login_left">滑动介绍图片</div>
			<div id="login_right">
				<div id="login_tab">
					<div id="login_btn" style="background:blue;color:white">用户登录</div>
					<div id="register_btn">注册</div>
				</div>

				<form method="post" action="judge.php">
					<input type="text" name="login_name" id="login_name" placeholder="请输入邮箱或用户名" class="login_input" required/>
					<input type="password" name="login_password" id="login_password" placeholder="请输入密码" class="login_input" required/>	
					<input type="button" id="login_submit" onclick="logSubHandler()" value="登录" class="submit"/>	
					
				</from>

				<span id="err1" class="err"></span>
			</div>
		</div>
		
		<div id="login_bottom">
			<div id="login_foot">二维码和其他介绍信息</div>
		</div>


	</div>
	<script type="text/javascript" src="../scripts/auxiliary.js"></script>
	<script type="text/javascript" src="../scripts/login.js"></script>
</body>
</html>