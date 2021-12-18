<?php
foreach(glob(__DIR__."/*.css") as $style) {
	// if(strpos($style, "old") !== false) continue;
	$style = ".".str_replace($ROOT, "", $style);
	echo "<link rel=\"stylesheet\" href=\"$style\">\n";
}
?>