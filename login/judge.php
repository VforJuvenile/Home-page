<!-- 所有错误跳转待完成 -->
<?php
	// 判断注册名是否存在
	@$name = $_GET['name'];
	@ $db  = new mysqli('localhost', 'root', '123456', 'wufu');
	if(mysqli_connect_errno()){
		echo "Error: 无法连接到数据库！";
		exit;
	};
	if(isset($name)){
		$query = "select count(*) from userinfo where userName = '".$name."'";
		$result = $db->query($query);
		$row = $result->fetch_row();
		$count = $row[0];
		if($count){
			$response = "用户名已存在！";
			// echo "用户名已存在！";
		}else{
			$response = "";
			// echo "";
		};
		echo $response;
	}
?>
<?php
	// 注册
	@$register_name= $_POST['register_name'];
	@$password = $_POST['password'];
	if(!isset($_POST['register_name']) && !isset($_POST['password'])){
		// do nothing
	}else{
		// @ $db = new mysqli('localhost', 'root', '123456', 'wufu');
		if (mysqli_connect_errno()){
			echo "Error: 无法连接到数据库！";
			exit;
		};
		$password = sha1($password);
		$query = "insert into userinfo (userName, password) values('".$register_name."', '".$password."')";
		$result = $db->query($query);
		if($result){

			$query4 = "select userId from userinfo where userName = '$register_name' and password = '$password'";
			$result4 = $db->query($query4);
			
			$row4 = $result4->fetch_assoc();
			$IdNum4 = $row4["userId"];

			session_start();
			$_SESSION['user_id'] = $register_name;
			$_SESSION['user_IdNum'] = $IdNum4;
			$h_url = "../index.php";
			header('Location:'.$h_url);
			// echo json_encode()
		}else{
			echo $password;
		};
	}
?>
<?php
	// 登陆判断
	@$login_name= $_POST['login_name'];
	@$login_password = $_POST['login_password'];

	$data = array();
	$data["name"] = $login_name;
	$data["password"] = $login_password;
	
	$err = "";
	if(!isset($_POST['login_name']) && !isset($_POST['login_password'])){

	}else{
		if (mysqli_connect_errno()){
			echo "Error: 无法连接到数据库！";
			exit;
		};
		$password = sha1($login_password);
		$query2 = "select count(*) from userinfo where userName = '$login_name' and password = '$password'";
		$result2 = $db->query($query2);
		// exception
		$row = $result2->fetch_row();
		$count = $row[0];
		if($count){

			$query3 = "select userId from userinfo where userName = '$login_name' and password = '$password'";
			$result3 = $db->query($query3);
			
			$row3 = $result3->fetch_assoc();
			$IdNum = $row3["userId"];

			session_start();
			$_SESSION['user_id'] = $login_name;
			$_SESSION['user_IdNum'] = $IdNum;

			// $h_url = "../index.php";
			// header('Location:'.$h_url);

			echo json_encode($data);
		}else{
			$err = "用户名或密码错误！";
			$id="e";
			Header("Location: http://localhost:8087/Home-page/login/login.php?id=$id");
		}
	}
?>