<?php
function upload($dir) {
	global $rootdir;
	$res = [];
	foreach($_FILES as $path => $file) {
		if(strlen($file["name"]) > 0) {
			$patharr = explode("/", $path);
			array_pop($patharr);
			$path = $rootdir.$dir.implode("/", $patharr);
			if(!is_dir($path)) mkdir($path);

			$patharr[] = $file["name"];
			$path = implode("/", $patharr);
			$dest = "$rootdir/$dir/$path";

			move_uploaded_file($file["tmp_name"], $dest);
			$cm = 0;
			if(preg_match("/\.part([0-9])*$/", $dest) == 1) $cm = combine($dest);

			$file["error"] = [
				"num" => $file["error"],
				"str" => uError($file["error"])
			];
			$res[] = [
				"path" => $path,
				"dest" => $dest,
				"file" => $file,
				"combined" => $cm
			];
		}
	}
	// echo json_encode([
	// 	$res,
	// 	"max_file_uploads" => ini_get("max_file_uploads"),
	// 	"upload_max_filesize" => ini_get("upload_max_filesize")
	// ]);
	return json_encode($res);
}

function uError($id) {
	return [
		0 => 'There is no error, the file uploaded with success',
		1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
		2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
		3 => 'The uploaded file was only partially uploaded',
		4 => 'No file was uploaded',
		6 => 'Missing a temporary folder',
		7 => 'Failed to write file to disk.',
		8 => 'A PHP extension stopped the file upload.',
	][$id];
}

function combine($part) {
	$to = explode(".part", $part)[0];
	if(preg_match("/\.part0$/", $part) == 1 && is_file($to)) {
		unlink($to);
	}

	if(($h = fopen($to, "a"))) {
		fwrite($h, file_get_contents($part));
		unlink($part);
		fclose($h);
	} else {
		return false;
	}
	return true;
}
?>