<?php
	header('Content-type: text/json');
	session_start();
	
	$userId = $_SESSION['user_IdNum'];
	$path = $_SERVER['PATH_INFO']; 
	$arr = explode('/',$path); 

	$markArr = array();
	$markPerArr = array();

	@ $db = new mysqli("localhost", 'root', '123456', 'wufu');

	if (mysqli_connect_errno()){
		echo "Error: 无法连接到数据库!";
		exit;
	}

	if ($_SERVER['REQUEST_METHOD'] == "GET") {
		
		@$name = $_GET['id'];
		@$isGet = $_GET["isGet"];

		if (!isset($userId)){
			// do nothing
		} else if(!isset($isGet)){
			
			$query2 = "select * from userBookerMarker where userId= '$userId'";
			$result = $db->query($query2);

			$num_results = $result->num_rows;

			for ($i = 0; $i < $num_results; $i++){

				$row = $result->fetch_assoc();
				$markPerArr = array("markerName"=>$row["markerName"], "markerUrl"=>$row["markerUrl"], "id"=>$row["Id"], "sortId"=>$row["sortId"], "hitCount"=>$row["hitCount"], "state"=>$row["state"]);
				$markArr[$i] = $markPerArr;

			}
			echo json_encode($markArr);
			
		} else {

			echo json_encode(array("markerName"=>$arr[2], "markerUrl"=>$name.$isGet));

		}

	// 保存 添加
	} else if ($_SERVER['REQUEST_METHOD'] == "POST"){
		
		$postData = file_get_contents('php://input', true);
		$postDataObj = json_decode($postData);

		@$urlName = $postDataObj->urlName;
		@$url = $postDataObj->url;
		@$id = $postDataObj->id;


		// 更新操作
		if ($id != "") {
		
			$query2 = "update userBookerMarker set markerName= '$urlName', markerUrl = '$url' where id = '$id'"; 
			$result = $db->query($query2);
			$response = "1";
		} else {

			$query = "select count(*) from userBookerMarker where markerName = '$urlName'";

			$result = $db->query($query);
			$row = $result->fetch_row();
			$count = $row[0];

			if ($count) {
				$response = "书签名已存在！";
			} else {
				$query2 = "insert into userbookermarker (userId, markerName, markerUrl, markerImgUrl, sortId, hitCount) values('".$userId."', '".$urlName."', '".$url."', '1', '0', '1')";
				
				$result = $db->query($query2);
				$response = "1";
			};
		}

		echo $response.JSON_encode($urlName);

	// 删除
	} else if ($_SERVER['REQUEST_METHOD'] == "DELETE") {

		// $urlName = $_DELETE["isGet"];
		$urlName = $arr[2];
		$query = "select count(*) from userBookerMarker where markerName = '$urlName'";

		$result = $db->query($query);
		$row = $result->fetch_row();
		$count = $row[0];

		if ($count) {

			$query = "delete from userbookermarker where userId=".$userId." and markerName='".$urlName."'";
				
			$result = $db->query($query);
		} else {
			$query = "该书签已经不存在！";
		}

		echo $query;

	} else {

	}

?>