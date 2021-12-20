<?php
function download($path) {
	global $rootdir;
	$path = filterpath($path);
	$path = fullpath($path);

	header("Content-Description: File Transfer");
	if(is_file($path)) {
		header("Content-Type: ".filetype($path));
		header("Content-Disposition: attachment; filename=\"".basename($path)."\"");
		readfile($path);
	} else if(is_dir($path)) {
		chdir("$path/../");
		$bn = basename($path);
		if(preg_match('/linux/i', $_SERVER["HTTP_USER_AGENT"])) {
			// tar
			$compressed = shell_exec("tar -czf - ".escapeshellarg($bn));
			// header("Content-Type: application/octet-stream");
			header("Content-Disposition: attachment; filename=\"$bn.tar.gz\"");
		} else {
			// zip
			$compressed = shell_exec("zip -r - ".escapeshellarg($bn)." | cat");
			// header("Content-Type: application/octet-stream");
			// header("Content-Type: application/zip");
			header("Content-Disposition: attachment; filename=\"$bn.zip\"");
		}

		return $compressed;
	} else {
		return json_encode([
			"error" => "Folder or File does not exist anymore"
		]);
	}
}
?>