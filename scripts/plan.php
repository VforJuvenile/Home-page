<?php
header("Content-type: text/html; charset=utf-8");

$response = file_get_contents(('php://input', 'r'));

echo $res;

?>