function createList({
	elem,
	paths,
	pathb = {
		folder: {
			onclick: "Explorer.to(this)"
		}
	},
	buttons = [
		{
			onclick: "UD.download(this)",
			innerHTML: svg.download
		},
		{
			onclick: "Explorer.rename(false, this)",
			innerHTML: svg.rename
		},
		{
			onclick: "Explorer.remove(this)",
			innerHTML: svg.remove
		}
	],
	r = false
}) {
	for(let path of paths) {
		let li = document.createElement("li");
		li.className = path.type;

		let span = document.createElement("span");
		if(pathb[path.type] && pathb[path.type].onclick) span.setAttribute("onclick", pathb[path.type].onclick);
		span.innerText = path.name;
		li.appendChild(span);

		for(let b of buttons) {
			let button = document.createElement("div");
			button.className = "btn";
			if(typeof b.onclick == "object") {
				button.setAttribute("onclick", b.onclick[path.type]);
			} else {
				button.setAttribute("onclick", b.onclick);
			}
			button.innerHTML = b.innerHTML;
			li.appendChild(button);
		}
		elem.appendChild(li);
		if(r) return [li, span];
	}
}