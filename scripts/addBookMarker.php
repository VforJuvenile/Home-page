<?php
	session_start();
	@$urlName = $_GET['urlName'];
	@$url2 = $_GET['url'];
    $user_id_num = $_SESSION['user_IdNum'];

    
	@ $db = new mysqli('localhost', "root", "123456","wufu");
	
	// 已经存在，1.是否覆盖
	$query = "select count(*) from userBookerMarker where markerName = '$urlName'";
	
	if (mysqli_connect_errno()){
		echo "Error: 无法连接到数据库!";
		exit;
	}

	$result = $db->query($query);
	$row = $result->fetch_row();
	$count = $row[0];
	if($count){
		$response = "书签名已存在！";
		// echo "用户名已存在！";
	}else{
		$query2 = "insert into userbookermarker (userId, markerName, markerUrl, markerImgUrl) values('".$user_id_num."', '".$urlName."', '".$url2."', '1')";
		
		$result = $db->query($query2);
		$response = "1";
	};

	echo $response;

?>