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
			<div id="login_log"><img src="../img/logo.jpg" alt="logo" style="width:300px;height:100px;"/></div>
			<div id="login_left">滑动介绍图片</div>
			<div id="login_right">
				<div id="login_tab">
					<div id="login_btn" >用户登录</div>
					<div id="register_btn" style="background:orange;color:white">注册</div>
				</div>

				 	<form action="judge.php" method="post" >
						<input type="text" name="register_name" id="username" placeholder="请输入邮箱或用户名" class="login_input" required/>
						<input type="password" name="password" id="password" placeholder="请输入密码" class="login_input" required/>	
						<input type="password" placeholder="请再次输入密码" id="repassword" class="login_input" required/>	
						<!-- <input type="hidden" name="flag1" /> -->
						<input type="submit"  id="register_submit" value="注册" class="submit"/>
					</from> 
					<!-- 注册成功，5秒后转到主页 -->
				
				<span id="err3" class="err"></span>
				<span class="err"></span>
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