<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Images</title>
	<style>
	body {
		background-color: black;
	}
	</style>
</head>
<body>
	<?php
	foreach(glob("./*.*") as $file) {
		if(stripos($file, "index") > -1) continue;
		echo "\t<img src=\"$file\" alt=\"$file\">\n";
	}
	?>
</body>
</html>