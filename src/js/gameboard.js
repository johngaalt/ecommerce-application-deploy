import { GAME_TYPES, GAME_OVER_CLASSES } from '../constants/game-types';

class Minesweeper {
  constructor() {
    this.gameType = GAME_TYPES.EASY;
    this.boardSize = this.gameType.numRows;
    this.numOfMines = this.gameType.numMines;
    this.board = [];
    this.isGameOver = false;
  }

  setGameType(gameType) {
    this.gameType = gameType;
    this.boardSize = this.gameType.numRows;
    this.numOfMines = this.gameType.numMines;
  }

  createBoard() {
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';

    for (let row = 0; row < this.boardSize; row++) {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');

      if (this.boardSize === 15) {
        boardContainer.classList.add('container-medium');
        boardContainer.classList.remove('container');
        boardContainer.classList.remove('container-hard');
      } else if (this.boardSize === 25) {
        boardContainer.classList.add('container-hard');
        boardContainer.classList.remove('container');
        boardContainer.classList.remove('container-medium');
      } else {
        boardContainer.classList.add('container');
        boardContainer.classList.remove('container-hard');
        boardContainer.classList.remove('container-medium');
      }

      this.board[row] = [];
      for (let col = 0; col < this.boardSize; col++) {
        const cell = {
          isMine: false,
          revealed: false,
          neighborMines: 0,
        };
        this.board[row][col] = cell;

        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.dataset.row = row;
        cellElement.dataset.col = col;

        rowElement.appendChild(cellElement);
      }

      boardContainer.appendChild(rowElement);
    }

    this.calculateNeighborMines();
    this.displayNeighborMines();
  }

  displayNeighborMines() {
    const boardContainer = document.getElementById('board');
    const cellElements = boardContainer.getElementsByClassName('cell');

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cell = this.board[row][col];
        const cellElement = cellElements[row * this.boardSize + col];

        if (!cell.isMine && cell.neighborMines > 0) {
          cellElement.textContent = cell.neighborMines;
        }
      }
    }
  }

  placeMines() {
    let minesCount = 0;
    while (minesCount < this.numOfMines) {
      const randomRow = Math.floor(Math.random() * this.boardSize);
      const randomCol = Math.floor(Math.random() * this.boardSize);

      if (!this.board[randomRow][randomCol].isMine) {
        this.board[randomRow][randomCol].isMine = true;
        minesCount++;
      }
    }
  }

  calculateNeighborMines() {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        if (!this.board[row][col].isMine) {
          const neighborCells = this.getNeighborCells(row, col);
          let neighborMines = 0;
          neighborCells.forEach((cell) => {
            if (this.board[cell.row][cell.col].isMine) {
              neighborMines++;
            }
          });
          this.board[row][col].neighborMines = neighborMines;
        }
      }
    }
  }

  getNeighborCells(row, col) {
    const neighbors = [];
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const neighborRow = row + i;
        const neighborCol = col + j;
        if (
          neighborRow >= 0
          && neighborRow < this.boardSize
          && neighborCol >= 0
          && neighborCol < this.boardSize
          && !(i === 0 && j === 0)
        ) {
          neighbors.push({ row: neighborRow, col: neighborCol });
        }
      }
    }
    return neighbors;
  }

  handleCellClick(row, col) {
    if (this.isGameOver) return;

    const cell = this.board[row][col];
    if (cell.revealed) return;

    cell.revealed = true;

    if (cell.isMine) {
      this.gameOver(false);
    } else if (cell.neighborMines === 0) {
      const neighborCells = this.getNeighborCells(row, col);
      neighborCells.forEach((neighbor) => {
        this.handleCellClick(neighbor.row, neighbor.col);
      });
    }
  }

  revealCell(row, col) {
    if (this.isGameOver) return;
    const cell = this.board[row][col];
    if (cell.revealed) return;

    cell.revealed = true;
    if (cell.isMine) {
      this.gameOver();
    } else if (cell.neighborMines === 0) {
      const neighborCells = this.getNeighborCells(row, col);
      neighborCells.forEach((neighbor) => {
        this.revealCell(neighbor.row, neighbor.col);
      });
    }
  }

  gameOver(isWin) {
    this.isGameOver = true;
    console.log('Game Over!');
    if (isWin) {
      document.getElementById('board').classList.add(GAME_OVER_CLASSES.WIN);
    } else {
      document.getElementById('board').classList.add(GAME_OVER_CLASSES.LOSE);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const minesweeper = new Minesweeper();
  minesweeper.createBoard();

  const boardContainer = document.getElementById('board');
  boardContainer.addEventListener('click', (event) => {
    const cellElement = event.target;
    const row = parseInt(cellElement.dataset.row);
    const col = parseInt(cellElement.dataset.col);
    minesweeper.handleCellClick(row, col);
  });

  minesweeper.placeMines();
  minesweeper.calculateNeighborMines();
  console.log(minesweeper.board);

  const easyButton = document.querySelector('.button--first');
  const mediumButton = document.querySelector('.button--second');
  const hardButton = document.querySelector('.button--third');

  easyButton.addEventListener('click', () => {
    minesweeper.setGameType(GAME_TYPES.EASY);
    minesweeper.createBoard();
    minesweeper.placeMines();
    minesweeper.calculateNeighborMines();
    console.log(minesweeper.board);
  });

  mediumButton.addEventListener('click', () => {
    minesweeper.setGameType(GAME_TYPES.MEDIUM);
    minesweeper.createBoard();
    minesweeper.placeMines();
    minesweeper.calculateNeighborMines();
    console.log(minesweeper.board);
  });

  hardButton.addEventListener('click', () => {
    minesweeper.setGameType(GAME_TYPES.HARD);
    minesweeper.createBoard();
    minesweeper.placeMines();
    minesweeper.calculateNeighborMines();
    console.log(minesweeper.board);
  });
});

export default Minesweeper;