class Cell {
  constructor(isMine, revealed, neighborMines) {
    this.isMine = isMine;
    this.revealed = revealed;
    this.neighborMines = neighborMines;
  }
}

export default Cell;
