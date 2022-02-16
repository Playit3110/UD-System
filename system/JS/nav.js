const Explorer = {
	init: function({elem = document.body, path = "/"}) {
		this.elem = elem;
		this.path = path;
		this.sorted = this.elem.getElementsByClassName("sort")[0].checked;
	},
	to: async function(dir = 0, abs = false) {
		if(dir == -1) {
			this.path = this.path.split("/");
			this.path.pop();
			this.path.pop();
			this.path = this.path.join("/") + "/";
			if(this.path[0] !== "/") this.path = "/" + this.path;
		} else if(dir !== 0) {
			if(typeof dir == "object") dir = dir.innerText;
			if(abs) {
				this.path = dir;
			} else {
				this.path += dir + "/";
			}
		}
		this.path = decodeURI(this.path);

		let paths = await request({
			data: {
				action: "folder",
				dir: this.path,
				sorted: this.sorted
			}
		});

		while(!this.elem.lastElementChild.classList.contains("fixed")) {
			this.elem.lastElementChild.remove();
		}

		this.elem.getElementsByClassName("path")[0].innerText = this.path;
		location.hash = this.path;
		createList({
			elem: this.elem,
			paths: paths
		});
	},
	add: function(path) {
		path = {
			name: "",
			size: 0,
			type: path
		}
		let elem = createList({
			elem: this.elem,
			paths: [path],
			r: true
		})[1];
		this.rename(false, elem, "add");
	},
	rename: function(e, elem, action = false) {
		if(elem.classList.contains("btn")) elem = elem.parentNode.firstElementChild;
		let that = this;
		let oldName = elem.innerText;
		elem.onblur = function() {
			elem.removeAttribute("contenteditable");
			let newName = elem.innerText;
			newName = newName.replace(/[ ]/g, "_");
			newName = newName.replace(/[^a-zA-Z0-9_\[\]\.\-]/g, "");
			if(oldName == newName) return;
			if(action == false && !confirm("Do you really want to rename \""+oldName+"\" to \""+newName+"\"?")) return;
			let div = elem.parentNode;
			let type = false;
			if(div.classList.contains("folder")) type = "folder";
			if(div.classList.contains("file")) type = "file";
			request({
				data: {
					action: (action !== false ? action : "rename"),
					old: {
						type: type,
						path: that.path + oldName
					},
					new: {
						type: type,
						path: that.path + newName
					}
				},
				cb: {
					onreadystatechange: function() {
						if(this.readyState == 4 && this.status == 200) {
							Explorer.to();
						}
					}
				}
			});
		}
		elem.setAttribute("contenteditable", true);
		elem.focus();
		if(e) e.preventDefault();
	},
	remove: function(elem) {
		if(elem.classList.contains("btn")) elem = elem.parentNode;
		if(!confirm("Do you really want to delete \""+elem.innerText+"\" ?")) return;
		let path = elem.innerText;
		request({
			data: {
				action: "remove",
				path: this.path + path
			},
			cb: {
				onreadystatechange: function() {
					if(this.readyState == 4 && this.status == 200) {
						Explorer.to();
					}
				}
			}
		});
	}
}