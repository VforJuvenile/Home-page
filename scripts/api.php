<?php
	header('Content-type: text/json');
	session_start();

	$userId = $_SESSION['user_IdNum'];
	$path = $_SERVER['PATH_INFO']; 
	$arr = explode('/',$path); 

	
?>