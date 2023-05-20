import Cell from './cell';
import { GAME_TYPES, GAME_OVER_CLASSES } from '../constants/game-types';

const MINE = '💣';

class Minesweeper {
  constructor() {
    this.gameType = GAME_TYPES.EASY;
    this.boardSize = this.gameType.numRows;
    this.numOfMines = this.gameType.numMines;
    this.board = [];
    this.isGameOver = false;
    this.timer = null;
    this.seconds = 0;
    this.movesCount = 0;
    this.movesCounterElement = document.querySelector('.moves-counter');
  }

  setGameType(gameType) {
    this.gameType = gameType;
    this.boardSize = this.gameType.numRows;
    this.numOfMines = this.gameType.numMines;
  }

  resetBoard() {
    const footer = document.getElementById('footer');
    footer.innerHTML = '';
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';
    boardContainer.classList.remove(GAME_OVER_CLASSES.WIN, GAME_OVER_CLASSES.LOSE);
    this.isGameOver = false;
  }

  createBoard() {
    this.resetBoard();
    const boardContainer = document.getElementById('board');

    this.board = [];

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
        const cell = new Cell(false, false, 0);
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

  handleCellClick(rowCell, colCell) {
    const row = parseInt(rowCell, 10);
    const col = parseInt(colCell, 10);

    if (this.isGameOver) return;

    const cell = this.board[row][col];
    if (cell.revealed) return;

    cell.revealed = true;
    this.revealCell(row, col, cell);

    if (!this.timer) {
      this.startTimer();
    }

    this.movesCount++;
    this.movesCounterElement.textContent = this.movesCount;

    if (cell.isMine) {
      this.finishGame(false);
    } else if (cell.neighborMines === 0) {
      const neighborCells = this.getNeighborCells(row, col);
      neighborCells.forEach((neighbor) => {
        this.handleCellClick(neighbor.row, neighbor.col);
      });
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.seconds++;
      const timerElement = document.querySelector('.timer');
      timerElement.textContent = this.seconds;
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.timer);
    this.seconds = 0;
    const timerElement = document.querySelector('.timer');
    timerElement.textContent = this.seconds;
  }

  finishGame(isWin) {
    this.isGameOver = true;
    if (isWin) {
      document.getElementById('board').classList.add(GAME_OVER_CLASSES.WIN);
      document.getElementById('footer').innerHTML = `Hooray! You found all mines in ${this.timer} seconds and ${this.movesCount} moves! 🤩`;
    } else {
      document.getElementById('board').classList.add(GAME_OVER_CLASSES.LOSE);
      document.getElementById('footer').innerHTML = 'Game over. Try again ☹️';
      this.revealAllMines();
    }
    clearInterval(this.timer);
  }

  revealCell(row, col, cell) {
    const cellElement = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`,
    );

    cellElement.classList.add('revealed');

    if (cell.isMine) {
      cellElement.classList.add('mine');
      cellElement.innerHTML = MINE;
    } else {
      cellElement.innerHTML = cell.neighborMines || '';
    }
  }

  revealAllMines() {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        if (this.board[row][col].isMine) {
          const cellElement = document.querySelector(
            `[data-row="${row}"][data-col="${col}"]`,
          );
          cellElement.innerHTML = MINE;
        }
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const minesweeper = new Minesweeper();
  minesweeper.createBoard();

  const boardContainer = document.getElementById('board');
  boardContainer.addEventListener('click', (event) => {
    const cellElement = event.target.closest('.cell');
    if (cellElement) {
      minesweeper.handleCellClick(cellElement.dataset.row, cellElement.dataset.col);
    }
  });

  minesweeper.placeMines();
  minesweeper.calculateNeighborMines();
  console.log('BOARD', minesweeper.board);

  const easyButton = document.querySelector('.button--first');
  const mediumButton = document.querySelector('.button--second');
  const hardButton = document.querySelector('.button--third');

  easyButton.addEventListener('click', () => {
    minesweeper.setGameType(GAME_TYPES.EASY);
    minesweeper.resetTimer();
    minesweeper.createBoard();
    minesweeper.placeMines();
    minesweeper.calculateNeighborMines();
    console.log('BOARD', minesweeper.board);
  });

  mediumButton.addEventListener('click', () => {
    minesweeper.setGameType(GAME_TYPES.MEDIUM);
    minesweeper.resetTimer();
    minesweeper.createBoard();
    minesweeper.placeMines();
    minesweeper.calculateNeighborMines();
    console.log('BOARD', minesweeper.board);
  });

  hardButton.addEventListener('click', () => {
    minesweeper.setGameType(GAME_TYPES.HARD);
    minesweeper.resetTimer();
    minesweeper.createBoard();
    minesweeper.placeMines();
    minesweeper.calculateNeighborMines();
    console.log('BOARD', minesweeper.board);
  });
});

export default Minesweeper;
