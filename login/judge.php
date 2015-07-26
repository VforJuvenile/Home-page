<?php
	@$name = $_GET['name'];
	@ $db  = new mysqli('localhost', 'root', '123456', 'wufu');
	if(mysqli_connect_errno()){
		echo "Error: 无法连接到数据库！";
		exit;
	};
	$query = "select count(*) from userinfo where userName = '".$name."'";
	$result = $db->query($query);
	$row = $result->fetch_row();
	$count = $row[0];
	if($count){
		$response = "用户名已存在！";
	}else{
		$response = "";
	};
	echo $response;
?>