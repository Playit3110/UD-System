<?php
foreach(glob(__DIR__."/*.js") as $script) {
	$script = ".".str_replace($ROOT, "", $script);
	echo "<script src=\"$script\"></script>\n";
}
?>