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

    savedResults.forEach((result, index) => {
      console.log(`Result ${index + 1}:`);
      console.log(`- ${result.win ? 'Won' : 'Lost'}`);
      console.log(`- Date: ${result.date}`);
      console.log(`- Moves: ${result.moves}`);
      console.log(`- Time: ${result.time} seconds`);
      console.log('------------------------');
    });
  }

  createElement() {
    this.resultsElement = document.createElement('button');
    this.resultsElement.textContent = 'Show results';
    this.resultsElement.id = 'show-results';
    return this.resultsElement;
  }
}
export default GameResult;
