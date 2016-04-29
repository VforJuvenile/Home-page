<?php
	header('Content-type: text/json');
	session_start();
	$userId = $_SESSION['user_IdNum'];
	$path = $_SERVER['PATH_INFO']; 
	$arr = explode('/',$path); 

	$markArr = array();
	$markPerArr = array();

	@$name = $_GET['id'];

	// restful query 和 get 的唯一区别是query期望返回的是数组
	// http://stackoverflow.com/questions/25897555/list-with-errorbadcfg-angularjs
	// if(isset($name)){
		// $markPerArr = array("markerName"=>$arr[1], "markerUrl"=>$arr[2]);
		// $markArr[0] = $markPerArr;
		// echo json_encode($markPerArr);
	// }
	
	if(!isset($userId)){
		// do nothing
	} else{
		@ $db = new mysqli("localhost", 'root', '123456', 'wufu');
		if (mysqli_connect_errno()){
			echo "Error: 无法连接到数据库!";
			exit;
		}

		$query2 = "select * from userBookerMarker where userId= '$userId'";
		$result = $db->query($query2);

		$num_results = $result->num_rows;

		for ($i = 0; $i < $num_results; $i++){

			$row = $result->fetch_assoc();
			$markPerArr = array("markerName"=>$row["markerName"], "markerUrl"=>$row["markerUrl"]);
			$markArr[$i] = $markPerArr;

		}
	}

	echo json_encode($markArr);
?>