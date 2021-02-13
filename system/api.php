<?php
set_time_limit(0);
ini_set("max_execution_time", 0);
ini_set("max_input_time", 0);
header("Access-Control-Allow-Origin: *");
include "./conf.php";
include "./main.php";

if(exists($_POST["data"])) {
	$DATA = json_decode($_POST["data"], true);
	switch($DATA["action"]) {
		case "folder":
			echo folder($DATA["dir"], $DATA["sorted"]);
			break;
		case "add":
			echo add($DATA["new"]);
			break;
		case "rename":
			echo renamePath($DATA["old"], $DATA["new"]);
			break;
		case "remove":
			echo remove($DATA["path"]);
			break;
		case "download":
			echo download($DATA["path"]);
			break;
		case "upload":
			echo upload($DATA["path"]);
			break;
	}
}
?>
