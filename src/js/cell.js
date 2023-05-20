import { FLAG, MINE } from '../constants/icons';

class Cell {
  isMine = false;

  revealed = false;

  neighborMines = 0;

  flagged = false;

  cellElement = null;

  createCellElement(row, col) {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.row = row;
    cellElement.dataset.col = col;

    this.cellElement = cellElement;
    return cellElement;
  }

  reveal() {
    this.revealed = true;

    this.cellElement.classList.add('revealed');

    if (this.isMine) {
      this.cellElement.classList.add('mine');
      this.cellElement.innerHTML = MINE;
    } else {
      this.cellElement.innerHTML = this.neighborMines || '';
      this.cellElement.dataset.neighborMines = this.neighborMines;
    }
  }

  updateFlag() {
    this.flagged = !this.flagged;

    this.cellElement.innerHTML = this.flagged ? FLAG : '';
    this.cellElement.classList.toggle('flagged', this.flagged);
  }

  displayMine() {
    this.cellElement.innerHTML = MINE;
  }
}

export default Cell;
