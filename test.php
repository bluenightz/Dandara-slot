<?php
	header("Content-Type: application/json;charset=utf-8");
	header("Access-Control-Allow-Origin: http://localhost:8888", false);
	$arr = array("point"=>12000);
	// echo $_GET["callback"]."(".json_encode($arr).");";
	echo json_encode( $arr );
?>