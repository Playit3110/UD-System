const UD = {
	files: {},
	download: function(fofname) {
		fofname = fofname.parentNode;
		fofname = fofname.firstElementChild;
		fofname = fofname.innerText;
		let path = Explorer.path + fofname;
		let data = {
			action: "download",
			path: path
		};
		// request({
		// 	data: {
		// 		action: "download",
		// 		path: path
		// 	},
		// 	cb: {
		// 		// responseType: "\"blob\"",
		// 		// fofname: "\""+fofname+"\"",
		// 		onreadystatechange: function(e) {
		// 			if(this.readyState == this.HEADERS_RECEIVED) {
		// 				this.fofname = this.getResponseHeader("Content-Disposition");
		// 				this.fofname = this.fofname.split("\"")[1];
		// 			}
		// 		},
		// 		onload: function(e) {
		// 			if(this.status == 200) {
		// 				//Create a new Blob object using the response data of the onload object
		// 				var blob = new Blob([this.response]);
		// 				//Create a link element, hide it, direct it towards the blob, and then 'click' it programatically
		// 				let a = document.createElement("a");
		// 				a.style = "display: none";
		// 				document.body.appendChild(a);
		// 				//Create a DOMString representing the blob and point the link element towards it
		// 				let url = window.URL.createObjectURL(blob);
		// 				a.href = url;
		// 				a.download = this.fofname;
		// 				//programatically click the link to trigger the download
		// 				a.click();
		// 				//release the reference to the file by revoking the Object URL
		// 				window.URL.revokeObjectURL(url);
		// 			} else {
		// 				alert(this.response);
		// 				//deal with your error state here
		// 			}
		// 		}
		// 	}
		// });

		let form = document.createElement("form");
		form.action = "./system/api.php";
		form.method = "POST";
		form.target = "_top";
		form.setAttribute("style", "display: none");

		let input = document.createElement("input");
		input.name = "data";
		input.setAttribute("value", JSON.stringify(data));
		form.appendChild(input);

		document.body.appendChild(form);
		form.submit();
		form.remove();
	},
	upload: function(elem) {
		let files = [
			...elem.getElementsByClassName("ifiles")[0].files,
			...elem.getElementsByClassName("ifolder")[0].files
		];
		function progress(e) {
			let elem = document.body.querySelector("[data-file=\"" + file.path + "\"");
			elem.classList.remove("error", "success");
			let s = elem.querySelector(".loaded");
			s.innerText = e.loaded.toBytes();
			elem = elem.querySelector(".slider");
			elem.style.width = 100 * e.loaded / e.total + "%";
			// elem.innerText = (100 * e.loaded / e.total).toPrecision(1) + "%";
		}
		function error(e) {
			let elem = document.body.querySelector("[data-file=\"" + file.path + "\"");
			elem.classList.add("error");
			setTimeout(function() {
				xhr.attempt++;
				xhr.open("POST", url);
				xhr.send(data);
			}, 100 * 2 ** xhr.attempt);
		}
		for(let file of files) {
			file = file.format();
			request({
				data: {
					action: "upload",
					path: Explorer.path
				},
				ctype: "multipart/form-data",
				file: file,
				cb: {
					attempt: 0,
					onreadystatechange: function() {
						if(this.readyState == 4 && this.status == 200) {
							let elem = document.body.querySelector("[data-file=\"" + file.path + "\"");
							elem.classList.add("success");
							Explorer.to();
							setTimeout(function() {
								elem.remove();
							}, 500);
						}
					},
					"upload.onprogress": progress,
					"upload.onloadstart": progress,
					onerror: error
				}
			});
		}
	},
	selected: function(elem) {
		this.files[elem.className] = elem.files;
		// let list = elem.parentNode.parentNode.parentNode; // as list elem
		let list = elem.parentElement.parentElement.nextElementSibling;
		while(list.lastElementChild && !list.lastElementChild.classList.contains("fixed")) {
			list.lastElementChild.remove();
		}
		for(let file of elem.files) {
			file = file.format();
			let li = document.createElement("li");
			li.className = "file bar";
			li.setAttribute("data-file", file.path);

			let span = document.createElement("span");
			span.innerText = file.path;
			li.append(span);

			let size = document.createElement("div");
			size.className = "size";

			let span2 = document.createElement("span");
			span2.className = "loaded";
			span2.innerText = (0).toBytes();
			size.append(span2);

			size.innerHTML += " / ";

			let span3 = document.createElement("span");
			span3.className = "total";
			span3.innerText = file.file.size.toBytes();
			size.append(span3);

			li.append(size);

			let slider = document.createElement("span");
			slider.className = "slider";
			li.append(slider);

			list.append(li);
		}
	}
}