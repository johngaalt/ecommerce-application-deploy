import Cell from './cell';
import { GAME_TYPES, GAME_OVER_CLASSES } from '../constants/game-types';
import sound from './sound';
import GameResult from './game-result';

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
    this.minesButton = document.querySelector('.mines-quantity');
    this.updateMinesButton();
  }

  updateMinesButton() {
    this.minesButton.textContent = `Mines: ${this.numOfMines}`;
  }

  setGameType(gameType) {
    this.gameType = gameType;
    this.boardSize = this.gameType.numRows;
    this.numOfMines = this.gameType.numMines;
    this.updateMinesButton();
  }

  resetBoard() {
    const message = document.getElementById('message');
    message.innerHTML = '';
    const boardContainer = document.getElementById('board');
    boardContainer.innerHTML = '';
    boardContainer.classList.remove(
      GAME_OVER_CLASSES.WIN,
      GAME_OVER_CLASSES.LOSE,
    );
    this.isGameOver = false;
    this.movesCount = 0;
    this.movesCounterElement.innerHTML = this.movesCount;
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
        const cell = new Cell();
        this.board[row][col] = cell;

        const cellElement = cell.createCellElement(row, col);
        rowElement.appendChild(cellElement);
      }

      boardContainer.appendChild(rowElement);
    }

    this.calculateNeighborMines();
  }

  placeMinesAfterFirstMove(firstRow, firstCol) {
    const excludedCells = this.getNeighborCells(firstRow, firstCol);
    excludedCells.push({ row: firstRow, col: firstCol });

    let minesCount = 0;
    while (minesCount < this.numOfMines) {
      const randomRow = Math.floor(Math.random() * this.boardSize);
      const randomCol = Math.floor(Math.random() * this.boardSize);

      if (
        !this.board[randomRow][randomCol].isMine
        && !excludedCells.some(
          (cell) => cell.row === randomRow && cell.col === randomCol,
        )
      ) {
        this.board[randomRow][randomCol].isMine = true;
        minesCount++;
      }
    }
  }

  calculateNeighborMines() {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cell = this.board[row][col];
        if (!cell.isMine) {
          const neighborCells = this.getNeighborCells(row, col);
          let neighborMines = 0;
          neighborCells.forEach((c) => {
            if (this.board[c.row][c.col].isMine) {
              neighborMines++;
            }
          });
          cell.neighborMines = neighborMines;
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

  countMoves() {
    this.movesCount++;
    this.movesCounterElement.textContent = this.movesCount;
  }

  countRevealedNonMineCells() {
    let count = 0;
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cell = this.board[row][col];
        if (cell.revealed && !cell.isMine) {
          count++;
        }
      }
    }
    return count;
  }

  handleCellClick(rowCell, colCell) {
    const row = parseInt(rowCell, 10);
    const col = parseInt(colCell, 10);

    if (this.isGameOver) return;

    const cell = this.board[row][col];
    if (cell.revealed) return;

    cell.reveal();

    if (!this.timer) {
      this.placeMinesAfterFirstMove(row, col);
      this.calculateNeighborMines();
      this.startTimer();
    }

    if (cell.isMine) {
      this.finishGame(false);
    } else if (cell.neighborMines === 0) {
      const neighborCells = this.getNeighborCells(row, col);
      neighborCells.forEach((neighbor) => {
        this.handleCellClick(neighbor.row, neighbor.col);
      });
    } else {
      const totalNonMineCells = this.boardSize * this.boardSize - this.numOfMines;
      const revealedNonMineCells = this.countRevealedNonMineCells();

      if (revealedNonMineCells === totalNonMineCells) {
        this.finishGame(true);
      }
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
    this.timer = null;
    this.seconds = 0;
    const timerElement = document.querySelector('.timer');
    timerElement.textContent = this.seconds;
  }

  finishGame(isWin) {
    this.isGameOver = true;
    if (isWin) {
      document.getElementById('board').classList.add(GAME_OVER_CLASSES.WIN);
      document.getElementById(
        'message',
      ).innerHTML = `Hooray! You found all mines in ${this.seconds} seconds and ${this.movesCount} moves! 🤩`;
      sound.playWinSound();
    } else {
      document.getElementById('board').classList.add(GAME_OVER_CLASSES.LOSE);
      document.getElementById('message').innerHTML = 'Game over. Try again ☹️';
      this.revealAllMines();
      sound.playLoseSound();
    }
    clearInterval(this.timer);
    const gameResult = new GameResult(isWin, this.movesCount, this.seconds);
    GameResult.saveResult(gameResult);
  }

  revealAllMines() {
    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        const cell = this.board[row][col];
        if (cell.isMine) {
          cell.displayMine();
        }
      }
    }
  }

  handleCellRightClick(row, col) {
    if (this.isGameOver) return;

    const cell = this.board[row][col];
    if (cell.revealed) return;

    sound.playClickSound();
    cell.updateFlag();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  sound.playStartSound();
  const minesweeper = new Minesweeper();
  minesweeper.createBoard();

  const boardContainer = document.getElementById('board');
  boardContainer.addEventListener('click', (event) => {
    const cellElement = event.target.closest('.cell');
    if (cellElement) {
      sound.playClickSound();
      minesweeper.countMoves();
      minesweeper.handleCellClick(
        cellElement.dataset.row,
        cellElement.dataset.col,
      );
    }
  });

  boardContainer.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    const cellElement = event.target.closest('.cell');
    if (cellElement) {
      const row = Number(cellElement.dataset.row);
      const col = Number(cellElement.dataset.col);
      minesweeper.handleCellRightClick(row, col);
    }
  });

  const easyButton = document.querySelector('.button--first');
  const mediumButton = document.querySelector('.button--second');
  const hardButton = document.querySelector('.button--third');
  const resetButton = document.querySelector('.button--fourth');

  resetButton.addEventListener('click', () => {
    sound.playStartSound();
    minesweeper.resetTimer();
    minesweeper.createBoard();
  });

  easyButton.addEventListener('click', () => {
    sound.playStartSound();
    minesweeper.setGameType(GAME_TYPES.EASY);
    minesweeper.resetTimer();
    minesweeper.createBoard();
  });

  mediumButton.addEventListener('click', () => {
    sound.playStartSound();
    minesweeper.setGameType(GAME_TYPES.MEDIUM);
    minesweeper.resetTimer();
    minesweeper.createBoard();
  });

  hardButton.addEventListener('click', () => {
    sound.playStartSound();
    minesweeper.setGameType(GAME_TYPES.HARD);
    minesweeper.resetTimer();
    minesweeper.createBoard();
  });

  document.getElementById('sound-switcher').addEventListener('click', () => {
    sound.toggleSound();
  });

  document.getElementById('show-results').addEventListener('click', () => {
    GameResult.displayGameResults();
  });

  const darkThemeButton = document.querySelector('.dark-theme');
  darkThemeButton.addEventListener('click', () => {
    const body = document.querySelector('body');
    body.classList.toggle('dark-theme-active');
  });
});

export default Minesweeper;
