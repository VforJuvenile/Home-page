<?php
	header('Content-type: text/json');
	session_start();
	$userId = $_SESSION['user_IdNum'];
	// @$userId = $_GET['a'];

	$markArr = array();
	$markPerArr = array();
	if(!isset($userId)){
		// do nothing
	}else{
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
	// echo json_encode($arr);
?>