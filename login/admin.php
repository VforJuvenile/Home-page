<?php
	@$login_name= $_POST['login_name'];
	@$login_password = $_POST['login_password'];
	// echo $login_name;
	// $err = "";
	if(!isset($_POST['login_name']) && !isset($_POST['login_password'])){

	}else{
		@ $db = new mysqli('localhost', 'root', '123456', 'wufu');
		if (mysqli_connect_errno()){
			echo "Error: 无法连接到数据库！";
			exit;
		};
		$query2 = "select count(*) from userinfo where userName = '$login_name' and password = sha1($login_password)";
		$result2 = $db->query($query2);
		$row = $result2->fetch_row();
		$count = $row[0];
		if($count){
			echo "A";
			// echo "<script type='text/javascript'>";
			// echo "window.location.href = '../index.php'";
			// echo "</script>";
		}else{
			echo "用户名或密码错误！";
		}
	}
?>