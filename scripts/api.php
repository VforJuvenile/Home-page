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
			
			$query2 = "select * from apidocument where groupName= '$userId'";
			$result = $db->query($query2);

			$num_results = $result->num_rows;

			for ($i = 0; $i < $num_results; $i++){

				$row = $result->fetch_assoc();

				$markPerArr = array(
					"fileName"=>$row["fileName"], 
					"methodName"=>$row["methodName"], 
					"id"=>$row["id"], 
					"description"=>$row["description"], 
					"usage"=>$row["usage"], 
					"input"=>$row["input"], 
					"output"=>$row["output"], 
					"notes"=>$row["notes"], 
					"lastChangeBy"=>$row["lastChangeBy"], 
					"lastChangeTime"=>$row["lastChangeTime"], 
					"groupName"=>$row["groupName"]
					);

				$markArr[$i] = $markPerArr;

			}
			echo json_encode($markArr);
			
		} else {

			echo json_encode(array("fileName"=>$arr[2], "methodName"=>$name.$isGet));

		}

	// 保存 添加
	} else if ($_SERVER['REQUEST_METHOD'] == "POST"){
		
		$postData = file_get_contents('php://input', true);
		$postDataObj = json_decode($postData);

		@$fileName = $postDataObj->fileName;
		@$methodName = $postDataObj->methodName;
		@$id = $postDataObj->id;
		@$description = $postDataObj->discription;
		@$usage = $postDataObj->usage;
		@$input = $postDataObj->input;
		@$output = $postDataObj->output;
		@$notes = $postDataObj->notes;
		@$lastChangeBy = $userId;
		@$lastChangeTime = $postDataObj->lastChangeTime;
		@$groupName = "wf";

		$query2 = "";

		// 更新操作
		if ($id != "") {
		
			$query2 = "update apidocument set fileName= '$fileName', methodName = '$methodName' , description= '$description', usage = '$usage' ,input= '$input', output = '$output' ,notes= '$notes', lastChangeBy = '$lastChangeBy' ,lastChangeTime= '$lastChangeTime', groupName = '$groupName' ,where id = '$id'"; 
			$result = $db->query($query2);
			$response = "1";
		} else {

			$query = "select count(*) from apidocument where fileName= '$fileName' and methodName = '$methodName'";

			$result = $db->query($query);
			$row = $result->fetch_row();
			$count = $row[0];

			if ($count) {
				$response = "书签名已存在！";
			} else {
				$query2 = "insert into apidocument (fileName, methodName, description, usage, input, output, notes, lastChangeTime, lastChangeBy, groupName) values('".$fileName."', '".$methodName."', '".$description."', '".$usage."', '".$input."', '".$output."', '".$notes."', '".$lastChangeTime."', '".$lastChangeBy."', '".$groupName."')";
				
				$result = $db->query($query2);
				$response = 1;
			};
		}

		echo $response.JSON_encode($query2).$result;

	// 删除
	} 
?>