const WIDTH = 7,
	HEIGHT = 5,
	DIFFICULTY = 2;

const winMessage = document.querySelector("#message"),
	resetButton = document.querySelector("#reset");

function toggleCell(y, x) {
	// find the cell at y,x and change it off<->on
	if (x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT) {
		let id = `#cell-${y}-${x}`; // "cell-4-1"
		// console.log("toggleCell:", id);
		let cell = document.querySelector(id);
		cell.classList.toggle("on");
	}
}

function randomNumbers(max) {
	return Math.floor(Math.random() * max) + 1;
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
			winMessage.innerText = "You Win!";
			resetButton.innerText = "Play Again.";
			resetButton.addEventListener("click", reset);
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

function setUpAllTiles() {
	for (let cell of document.querySelectorAll(".cell")) {
		cell.classList.remove("on");
	}
	for (let i = 0; i < DIFFICULTY; i++) {
		let x = randomNumbers(WIDTH) - 1;
		let y = randomNumbers(HEIGHT) - 1;
		toggleCellAndNeighbors(y, x);
	}
}

function reset() {
	winMessage.innerText = "click the squares until all the squares are darked out!";
	resetButton.innerText = "Reset";
	setUpAllTiles();
}

function addClickListeners() {
	for (let cell of document.querySelectorAll(".cell")) {
		// console.log("addClickListeners", cell);
		cell.addEventListener("click", handleCellClick);
	}
}

setUpAllTiles();
addClickListeners();
