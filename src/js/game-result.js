const STORAGE_KEY = 'gameResults';
class GameResult {
  constructor(isWin, moves, time) {
    this.isWin = isWin;
    this.date = new Date().toLocaleString();
    this.moves = moves;
    this.time = time;
  }

  static saveResult(result) {
    const existingResults = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    existingResults.unshift(result);
    const latestResults = existingResults.slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(latestResults));
  }

  static getResults() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  static displayGameResults() {
    const savedResults = GameResult.getResults();

    const popupMenu = document.createElement('div');
    popupMenu.classList.add('popup-menu');

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'Close';

    closeButton.addEventListener('click', () => {
      popupMenu.remove();
    });

    const resultList = document.createElement('ul');

    savedResults.forEach((result, index) => {
      const resultItem = document.createElement('li');
      resultItem.textContent = `Result ${index + 1}:`;
      resultList.appendChild(resultItem);

      const winLossItem = document.createElement('li');
      winLossItem.textContent = `Result: ${result.win ? 'Won' : 'Lost'}`;
      resultList.appendChild(winLossItem);

      const dateItem = document.createElement('li');
      dateItem.textContent = `Date: ${result.date}`;
      resultList.appendChild(dateItem);

      const movesItem = document.createElement('li');
      movesItem.textContent = `Moves: ${result.moves}`;
      resultList.appendChild(movesItem);

      const timeItem = document.createElement('li');
      timeItem.textContent = `Time: ${result.time} seconds`;
      resultList.appendChild(timeItem);
    });

    popupMenu.appendChild(resultList);
    popupMenu.appendChild(closeButton);

    document.body.appendChild(popupMenu);
  }

  createElement() {
    this.resultsElement = document.createElement('button');
    this.resultsElement.textContent = 'results';
    this.resultsElement.id = 'show-results';
    return this.resultsElement;
  }
}
export default GameResult;
