<?php
foreach(glob(__DIR__."/*.css") as $file) {
	if(strpos($file, "old") !== false) continue;
	$file = ".".str_replace($ROOT, "", $file);
	echo "<link rel=\"stylesheet\" href=\"$file\">\n";
}
?>