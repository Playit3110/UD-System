<?php
header("Content-Type: application/json");

// function dirsize($dir) {
// 	$size = 0;
// 	foreach (glob(rtrim($dir, '/').'/*', GLOB_NOSORT) as $each) {
// 		$size += is_file($each) ? filesize($each) : dirsize($each);
// 	}
// 	return $size;
// }

// function size($dof) {
// 	$ext = "KMGTP";
// 	if(is_file($dof)) {
// 		$size = filesize($dof);
// 	} else {
// 		$size = dirsize($dof);
// 	}
// 	$i = 0;
// 	while($size > 1000 ** ++$i);
// 	--$i;
// 	$size /= (1000 ** $i);
// 	$ext = ($i > 0 ? $ext[$i - 1] : "")."B";
// 	return "$size$ext";
// }

function folder($current, $sort = false) {
	global $rootdir;
	$current = filterpath($current);
	$dir = glob("$rootdir/$current/{,.}[!.,!..]*", GLOB_MARK | GLOB_BRACE);
	if($sort !== false) {
		natcasesort($dir);
		// if($sort == "folder") {
			foreach($dir as $i=>$dof) {
				if(is_file($dof)) {
					array_push($dir, $dof);
					unset($dir[$i]);
				}
			}
		// }
		$dir = array_values($dir);
	}
	foreach($dir as $i=>$dof) {
		// $name = explode("/", $dof);
		// $name = $name[count($name) - 1];
		$name = pathinfo($dof)["basename"];
		$dir[$i] = [
			"name" => $name,
			"size" => filesize($dof),
			"type" => is_file($dof) ? "file" : "folder"
		];
	}
	return json_encode($dir);
}
?>