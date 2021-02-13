<?php
$ROOT = __DIR__;
if(empty(session_id())) session_start();

function toimg($path) {
	$img = file_get_contents($path);
	$img = str_replace("\n", "", $img);
	return addslashes($img);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Upload / Download</title>
	<?php
	include_once("./system/CSS/css.php");
	include_once("./system/JS/js.php");
	?>
	<script src="/main/JS/dark.js"></script>
	<script>
	let svg = {
		download: "<?php echo toimg("./system/img/download.svg"); ?>", 
		rename: "<?php echo toimg("./system/img/edit.svg"); ?>",
		remove: "<?php echo toimg("./system/img/trash-2.svg"); ?>"
	}
	</script>
</head>
<body>
	<nav>
		<ul id="explorer">
			<li class="fixed menu">
				<span id="path" class="path" onclick="Textcopy(this.innerText)">/</span>
				<div class="btn" onclick="Explorer.to()">
					<?php include "./system/img/refresh.svg"; ?>
				</div>
				<label class="btn">
					<input type="checkbox" class="sort" hidden>
					<?php include "./system/img/bar-graph.svg"; ?>
				</label>
				<label class="btn">
					<input type="checkbox" class="ssh" onclick="document.getElementById('explorer').classList.toggle('ssh')" hidden>
					<?php include "./system/img/terminal.svg"; ?>
				</label>
			</li>
			<li class="fixed folder">
				<span onclick="Explorer.to(-1)">..</span>
				<div class="btn" onclick="Explorer.add('file')">
					<?php include "./system/img/file-plus.svg" ?>
				</div>
				<div class="btn" onclick="Explorer.add('folder')">
					<?php include "./system/img/folder-plus.svg" ?>
				</div>
			</li>
		</ul>
	</nav>
	<main>
		<div class="title">
			<span>Upload</span>
			<button onclick="UD.upload(this.parentNode.parentNode)">
				<?php include "./system/img/upload.svg"; ?>
			</button>
		</div>
		<div class="options">
			<ul>
				<li class="fixed menu">
					<label>
						<span>Files</span>
						<input type="file" class="ifiles" name="files[]" multiple onchange="UD.selected(this)" hidden>
					</label>
				</li>
			</ul>
			<ul>
				<li class="fixed menu">
					<label>
						<span>Folders</span>
						<input type="file" class="ifolder" name="folders[]" directory webkitdirectory moxdirectory mozdirectory msdirectory odirectory multiple onchange="UD.selected(this)" hidden>
					</label>
				</li>
			</ul>
		</div>
	</main>
</body>
</html>