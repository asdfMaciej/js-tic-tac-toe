/* simple tic tac toe implementation for school */
class TicTacToe {
	constructor() {
		this.boxes = [...document.querySelectorAll('.box')];
		this.boxes.forEach((box, n) => {
			box.addEventListener("click", () => {
				this.playBox(n);
			})
		});

		this.game = {
			turn: 'x',
			scoreboard: {
				x: 0,
				o: 0
			},
			pause: false
		};

		this.resetBoard();
		this.updateHTML();
	}

	pos(row, column) {
		return row * 3 + column;
	}

	updateHTML() {
		this.updateTurnText(`Teraz gra: ${this.game.turn == 'x' ? 'krzyżyk' : 'kółko'}`);
		this.updateScoreboardText(this.game.scoreboard.x, this.game.scoreboard.o);
	}

	updateTurnText(txt) {document.querySelector(".turn").innerHTML = txt;}
	updateScoreboardText(x, o) {
		let s = document.querySelectorAll('.score');
		s[0].innerHTML = `Krzyżyk: ${x} ${x == 1 ? 'punkt' : x < 1 || x > 4 ? 'punktów' : 'punkty'}`;
		s[1].innerHTML = `Kółko: ${o} ${o == 1 ? 'punkt' : o < 1 || o > 4 ? 'punktów' : 'punkty'}`;
	}

	playBox(index) {
		if (this.game.pause)
			return;

		let element = this.game.turn;

		if (!['', 'x', 'o'].includes(element))
			return console.error(`attempt to set ${element} on ${index}`);
		
		if (index < 0 || index > 8)
			return console.error(`invalid index ${index}`);

		if (this.board[index] != '')
			return console.log(`attempt to play on taken field`);

		this.board[index] = element;
		this.boxes[index].innerHTML = element;

		this.checkTurn();
	}

	checkTurn() {
		this.game.turn = this.game.turn == 'x' ? 'o' : 'x';
		let possiblities = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
			[0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
			[0, 4, 8], [2, 4, 6] // diagonal
		];

		this.updateHTML();

		for (let c of possiblities) {
			let win = this.board[c[0]] == this.board[c[1]]
			&& this.board[c[1]] == this.board[c[2]];

			if (win && this.board[c[0]] != '')
				return this.win(this.board[c[0]]);
		}

		for (let b of this.board)
			if (!b)
				return;
		
		this.stalemate();
	}

	resetBoard() {
		this.board = Array(9).fill('');
	}

	win(who) {
		setTimeout(() => {this.nextGame();}, 3000);
		this.game.pause = true;
		this.game.scoreboard[who] += 1;
		this.updateTurnText(`<b>Wygrana przez ${who == 'x' ? 'krzyżyk' : 'kółko'}!</b>`);
	}

	stalemate() {
		setTimeout(() => {this.nextGame();}, 3000);
		this.game.pause = true;
		this.updateTurnText(`<b>Remis.</b>`);
	}
	nextGame() {
		this.resetBoard();
		this.boxes.forEach((box) => {box.innerHTML = ''});
		this.updateHTML();
		this.game.pause = false;
	}
}

var game;
(function() {
	game = new TicTacToe();
})();