<?php
	header('Content-type: text/json');
	session_start();
	
	$userId = $_SESSION['user_IdNum'];
	// $path = $_SERVER['PATH_INFO']; 
	// $arr = explode('/',$path); 

	$markArr = array();
	$markPerArr = array();

	@ $db = new mysqli("localhost", 'root', '123456', 'wufu');

	if ($_SERVER['REQUEST_METHOD'] == "GET") {
		
		@$name = $_GET['id'];

		
		if (!isset($userId)){
			// do nothing
		} else{
			
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

	// 保存
	} else if ($_SERVER['REQUEST_METHOD'] == "POST"){
		
		$postData = file_get_contents('php://input', true);
		$postDataObj = json_decode($postData);
		@$urlName = $postDataObj->urlName;
		@$url = $postDataObj->url;

		$query = "select count(*) from userBookerMarker where markerName = '$urlName'";

		$result = $db->query($query);
		$row = $result->fetch_row();
		$count = $row[0];
		if($count){
			$response = "书签名已存在！";
		}else{
			$query2 = "insert into userbookermarker (userId, markerName, markerUrl, markerImgUrl) values('".$userId."', '".$urlName."', '".$url."', '1')";
			
			$result = $db->query($query2);
			$response = "1";
		};

		echo $response.$postDataObj->urlName.$postDataObj->url;

	// 删除
	} else if ($_SERVER['REQUEST_METHOD'] == "DELETE") {

	} else {

	}

?>