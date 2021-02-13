<?php
foreach(glob(__DIR__."/*.js") as $file) {
	$file = ".".str_replace($ROOT, "", $file);
	echo "<script src=\"$file\"></script>\n";
}
?>