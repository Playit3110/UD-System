window.onload = function() {
	toDark();
	setInterval(function() {
		toDark();
	}, 60000);
	window.onhashchange();

	let url = new URL(location).searchParams;
	if(url.has("dark")) document.body.classList.add("dark");

	let data = {
		elem: document.getElementById("explorer")
	};
	let h = location.hash.substr(1);
	if(h !== "") data.path = h;
	Explorer.init(data);
	Explorer.to();
}

window.onhashchange = function() {
	let hash = location.hash.substr(1);
	let elem = document.getElementById("path");
	elem.innerText = hash;
}

function Textcopy(txt) {
	let input = document.createElement("input");
	input.value = txt;
	input.hidden;
	document.body.appendChild(input);
	input.select();
	input.setSelectionRange(0, txt.length);
	document.execCommand("copy");
	input.remove();
}

// function toDark() {
// 	let url = new URL(location).searchParams;
// 	let date = new Date();
// 	let h = date.getHours();
// 	let m = date.getMonth()+1;
// 	let sunrise = Math.round(-6 * Math.sin((4 * m) / (5 * Math.PI)) + 9);
// 	let sunset = Math.round(6 * Math.sin((4 * m) / (5 * Math.PI)) + 16);
// 	console.log(sunrise, sunset);
// 	if(h < sunrise || h > sunset || url.has("dark")) {
// 		document.body.classList.add("dark");
// 	} else {
// 		document.body.classList.remove("dark");
// 	}
// }

function request({method = "POST", data = "", ctype = "application/x-www-form-urlencoded"/*"multipart/form-data"*/, url = "./system/api.php", cb = false, file}) {
	return new Promise(function(resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				let res = this.responseText;
				res = JSON.parse(res);
				resolve(res);
			}
		}
		xhr.onerror = function(e) {
			reject(e);
		}
		if(cb !== false) {
			for(let cbname in cb) {
				eval("xhr."+cbname+" = "+cb[cbname]);
			}
		}
		xhr.open(method, url);
		if(ctype == "multipart/form-data") {
			let fd = new FormData();
			if(file.parts) {
				for(let part of file.parts) {
					part = part.format(false);
					fd.append(part.path, part.file);
				}
			} else {
				fd.append(file.path, file.file);
			}
			fd.append("data", JSON.stringify(data));
			data = fd;
		} else {
			xhr.setRequestHeader("Content-Type", ctype);
			data = "data=" + JSON.stringify(data);
		}
		xhr.send(data);
	});
}

function log(...data) {
	if(typeof data == "object") data = JSON.stringify(data);
	let stat = document.getElementById("stat");
	let isstat = stat == null;
	if(isstat) {
		stat = document.createElement("div");
		stat.id = "stat";
	}
	stat.innerText += '"'+data+'"\n';
	if(isstat) {
		document.body.appendChild(stat);
	}
}

File.prototype.toChunks = function(size = 2 ** 20, path = false) {
	let ptr = 0;
	let ePtr = this.size;
	let i = 0;
	let parts = [];
	while(ptr < ePtr) {
		let blob = this.slice(ptr, ptr += size);
		let part = new File([blob], (path ? path : this.name)+".part"+i);
		parts.push(part);
		i++;
	}
	return parts;
}

File.prototype.format = function(parts = true) {
	let file = {
		file: this,
		path: (this.webkitRelativePath ? this.webkitRelativePath : this.name)
	};
	if(this.size > 2 ** 20 && parts) {
		let size = 1;
		while(10 * size * 2 ** 20 < this.size) {
			size *= 2;
		}
		size *= 2 ** 20;
		file.parts = file.file.toChunks(size, file.path);
	}
	return file;
}

Number.prototype.toBytes = function(pre = 2) {
	let b = "BKMGTZY";
	let exp = 0;
	let num = this;
	if(num > 0) {
		while(2 ** (10 * exp) < num) exp++;
		exp--;
		num /= 2 ** (10 * exp);
	}
	return num.toFixed(pre) + b[exp] + (exp < 1 ? "" : "B");
}