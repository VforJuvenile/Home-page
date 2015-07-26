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
					<div id="login_btn" >用户登录</div>
					<div id="register_btn" style="background:orange;color:white">注册</div>
				</div>
				
				<?php
				 	@$name = $_POST['name'];
				 	@$password = $_POST['password'];
					$err2 = "";$err3 = "";
				 	if(!isset($_POST['name']) && !isset($_POST['password'])){
				 ?>
				 	<form action="register.php" method="post" >
						<input type="text" name="name" id="username" placeholder="请输入邮箱或用户名" class="login_input" required/>
						<input type="password" name="password" id="password" placeholder="请输入密码" class="login_input" required/>	
						<input type="password" placeholder="请再次输入密码" id="repassword" class="login_input" required/>	
						<!-- <input type="hidden" name="flag1" /> -->
						<input type="submit"  id="register_submit" value="注册" class="submit"/>
					</from> 
					<!-- 注册成功，5秒后转到主页 -->
				<?php
					}else{
						
						@ $db = new mysqli('localhost', 'root', '123456', 'wufu');
						if (mysqli_connect_errno()){
							echo "Error: 无法连接到数据库！";
							exit;
						};
						$query2 = "select count(*) from userinfo where userName = '$name'";
						$result2 = $db->query($query2);
						$row = $result2->fetch_row();
						$count = $row[0];
						if($count){
							$err2 = "用户名已存在!";
				?>
							<form action="register.php" method="post" >
							<input type="text" name="name" placeholder="请输入邮箱或用户名" class="login_input" required/>
							<input type="password" name="password" placeholder="请输入密码" class="login_input" required/>	
							<input type="password" placeholder="请再次输入密码" id="repassword" class="login_input" required/>	
							<!-- <input type="hidden" name="flag1" /> -->
							<input type="submit" id="register_submit" value="注册" class="submit"/>

							</from> 
				<?php
						}else{

							$password = sha1($password);
							$query = "insert into userinfo (userName, password) values('".$name."', '".$password."')";
							$result = $db->query($query);
							if($result){
								echo "<script type='text/javascript'>";
								echo "window.location.href = '../index.php'";
								echo "</script>";
							}else{
								echo "请重试，无法添加到数据库！";
							};
						}
					}
						
				?>
				<span id="err3" class="err"><?php echo $err3;?></span>
				<span class="err"><?php echo $err2;?></span>
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