<?php
function download($path) {
	global $rootdir;
	$path = "$rootdir/$path";
	header("Content-Description: File Transfer");
	if(is_file($path)) {
		header("Content-Type: ".filetype($path));
		header("Content-Disposition: attachment; filename=\"".basename($path)."\"");
		return readfile($path);
	} else if(is_dir($path)) {
		chdir("$path/../");
		$tar = shell_exec("tar -czf - ".basename($path)." | cat");
		// header("Content-Type: application/octet-stream");
		header("Content-Disposition: attachment; filename=\"".basename($path).".tar.gz\"");
		return $tar;
	}
}
?>