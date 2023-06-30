import { allLevels } from './Level';

class GameState {
  currentLevelId: number;
  finishedLevels: Set<number>;

  constructor() {
    this.currentLevelId = 1;
    this.finishedLevels = new Set();
  }

  reset() {
    this.currentLevelId = 1;
    this.finishedLevels = new Set();
  }

  saveCurrentLevelId(currentLevelId: number) {
    if (currentLevelId < 1) {
      this.currentLevelId = allLevels.getTotalCount();
    } else if (currentLevelId > allLevels.getTotalCount()) {
      this.currentLevelId = 1;
    } else {
      this.currentLevelId = currentLevelId;
    }
  }

  saveFinishedLevel(levelId: number) {
    this.finishedLevels.add(levelId);
  }

  saveToLocalStorage() {
    const state = {
      currentLevelId: this.currentLevelId,
      finishedLevels: Array.from(this.finishedLevels),
    };
    const stateStringified = JSON.stringify(state);
    localStorage.setItem('state', stateStringified);
  }

  get() {
    return this;
  }

  getFromLocalStorage() {
    const stateStringified = localStorage.getItem('state');

    if (stateStringified) {
      const state = JSON.parse(stateStringified);
      this.currentLevelId = state.currentLevelId;
      this.finishedLevels = new Set(state.finishedLevels);
    }
  }
}

const gameState = new GameState();

export default gameState;
