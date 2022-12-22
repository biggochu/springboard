class Connect4 {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.board = []
    this.$board = document.getElementById('board')
    this.player1 = new Player('red')
    this.player2 = new Player('blue')
    this.currPlayer = this.player1

    this.initialize()
  }

  initialize() {
    document.getElementById('start-btn').addEventListener('click', e => this.startGame())
    this.startGame()
  }

  /**
   * Generate board data
   * @return {undefined}
   */
  makeBoard() {
    this.board = []

    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from(Array(this.width)))
    }
  }

  /**
   * Render the game board
   * @return {undefined}
   */
  renderBoard() {
    this.$board.innerHTML = ''

    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    this.$board.append(top);

    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      this.$board.append(row);
    }
  }

  /**
   * Check if current player's move is a winning move
   */
  checkForWin() {
    const _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      return cells.every(
        ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3]
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x]
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3]
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3]
        ];

        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }

  /**
   * Alert end of game
   * @param  {String} msg
   * @return {[type]}
   */
  endGame(msg) {
    alert(msg)
  }

  /**
   * Identify bottom most empty spot in column
   * @param  {Number} x
   * @return {Number|null}
   */
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (this.board[y][x] === undefined) {
        return y
      }
    }
    return null
  }

  /**
   * Handle column placement click
   * @param  {EventObject} evt
   * @return {undefined}
   */
  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }

    // check for tie
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    // switch players
    this.currPlayer = this.currPlayer === this.player1 ? this.player2 : this.player1;
  }

  /**
   * Add player piece to board
   * @param  {Number} y
   * @param  {Number} x
   * @return {undefined}
   */
  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.top = -50 * (y + 2);
    piece.style.backgroundColor = this.currPlayer.color

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /**
   * Set the board size and render board
   * @param {Number} width
   * @param {Number} height
   */
  setBoardSize(width, height) {
    this.width = width
    this.height = height

    this.makeBoard()
    this.renderBoard()
  }

  /**
   * Set board size and set player colors
   * @return {undefined}
   */
  startGame() {
    const $width = document.getElementById('width')
    const $height = document.getElementById('height')

    this.setBoardSize(+$width.value, +height.value)

    const $player1Color = document.getElementById('player1-color')
    const $player2Color = document.getElementById('player2-color')

    this.player1.setColor($player1Color.value)
    this.player2.setColor($player2Color.value)
  }
}

class Player {
  constructor(color) {
    this.color = color
  }

  /**
   * Set player color
   * @param {String} color
   */
  setColor(color) {
    this.color = color
  }
}

const game = new Connect4(7, 6)