<?php
function add($fof) {
	$fofpath = filterpath($fof["path"]);
	$fofpath = fullpath($fofpath);
	
	$res = false;
	if(!is_dir($fofpath) && !is_file($fofpath)) {
		$res = $fof["type"] == "folder" ? mkdir($fofpath) : touch($fofpath);
	}

	return json_encode([
		"state" => ($res ? "success" : "error"),
		"path" => $fofpath
	]);
}

function renamePath($old, $new) {
	$oldpath = filterpath($old["path"]);
	$oldpath = fullpath($oldpath);

	$newpath = filterpath($new["path"]);
	$newpath = fullpath($newpath);

	$res = false;
	if(is_dir($oldpath) || is_file($oldpath)) {
		$res = rename($oldpath, $newpath);
	}
	return json_encode([
		"state" => ($res ? "success" : "error"),
		"type" => is_dir(($res ? $newpath : $oldpath)) ? "folder" : "file",
		"old" => $oldpath,
		"new" => $newpath
	]);
}

function remove($path) {
	$path = filterpath($path);
	$path = fullpath($path);

	$res = false;
	if(is_dir($path)) {
		function deleteAll($dir) {
			foreach(glob("$dir/*") as $fof) {
				if(is_dir($fof)) {
					deleteAll($fof);
				} else {
					unlink($fof);
				}
			}
			rmdir($dir);
			return true;
		}
		$res = deleteAll($path);
	} else if(is_file($path)) {
		$res = unlink($path);
	}

	return json_encode([
		"state" => ($res ? "success" : "error")
	]);
}
?>