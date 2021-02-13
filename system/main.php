<?php
foreach(glob("PHP/*.php") as $file) {
	include_once($file);
}

function exists($var) {
	return (isset($var) && !empty($var));
}

function filterpath($path) {
	$path = str_replace(array("/", "\\"), DIRECTORY_SEPARATOR, $path);
	$parts = array_filter(explode(DIRECTORY_SEPARATOR, $path), "strlen");
	$absolutes = [];
	foreach($parts as $part) {
		if("." == $part) continue;
		if(".." == $part) {
			array_pop($absolutes);
		} else {
			$absolutes[] = $part;
		}
	}
	return implode(DIRECTORY_SEPARATOR, $absolutes);
}

function fullPath($path) {
	global $rootdir;
	// if(is_dir("$rootdir/$path") && $path[strlen($path)] !== DIRECTORY_SEPERATOR) $path .= "/";
	return "$rootdir/$path";
}
?>