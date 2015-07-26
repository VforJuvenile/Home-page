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

				<?php
					@$login_name= $_POST['login_name'];
				 	@$login_password = $_POST['login_password'];
				 	$err = "";
				 	if(!isset($_POST['login_name']) && !isset($_POST['login_password'])){
				 ?>
					<form method="post" action="login.php">
						<input type="text" name="login_name" placeholder="请输入邮箱或用户名" class="login_input" required/>
						<input type="password" name="login_password" placeholder="请输入密码" class="login_input" required/>	
						<input type="submit" value="登录" class="submit"/>	
					
					</from>
				<?php
					}else{
						@ $db = new mysqli("localhost", "root", "123456", "wufu");
						if (mysqli_connect_errno()){
							echo "Error: 无法连接到数据库！";
							exit;
						};
						$query2 = "select count(*) from userinfo where userName = '$login_name' and password = sha1($login_password)";
						$result2 = $db->query($query2);
						$row = $result2->fetch_row();
						$count = $row[0];
						if($count){
							echo "<script type='text/javascript'>";
							echo "window.location.href = '../index.php'";
							echo "</script>";
						}else{
							$err = "请输入正确的用户名和密码！";
				?>
							<form method="post" action="login.php">
								<input type="text" name="login_name" placeholder="请输入邮箱或用户名" class="login_input" value="<?php echo $login_name;?>" required/>
								<input type="password" name="login_password" placeholder="请输入密码" class="login_input" value="<?php echo $login_password;?>" required/>	
								<input type="submit" value="登录" class="submit"/>	
					
							</from>
				<?php
							
						}
					}
				?>
				<span class="err"><?php echo $err;?></span>
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