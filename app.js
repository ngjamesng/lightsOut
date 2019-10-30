const WIDTH = 7,
	HEIGHT = 5;

function toggleCell(y, x) {
	// find the cell at y,x and change it off<->on
	if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
		let id = `#cell-${y}-${x}`; // "cell-4-1"
		// console.log("toggleCell:", id);
		let cell = document.querySelector(id);
		cell.classList.toggle("on");
	}
}

function handleCellClick(event) {
	let id = event.target.id; // "cell-4-1"
	let y = +id[5];
	let x = +id[7];
	toggleCellAndNeighbors(y, x);
	if (checkForWin) {
		handleWin();
	}
}

function toggleCellAndNeighbors(y, x) {
	toggleCell(y, x);
	toggleCell(y - 1, x);
	toggleCell(y + 1, x);
	toggleCell(y, x - 1);
	toggleCell(y, x + 1);
}

function handleWin() {
	// called when we win
	if (checkForWin()) {
		setTimeout(() => {
			alert("you win!");
		}, 100);
	}
}
function checkForWin() {
	for (let cell of document.querySelectorAll(".cell")) {
		if (cell.classList.contains("on")) {
			return false;
		}
	}
	return true;
}

function addClickListeners() {
	for (let cell of document.querySelectorAll(".cell")) {
		// console.log("addClickListeners", cell);
		cell.addEventListener("click", handleCellClick);
	}
}

addClickListeners();
