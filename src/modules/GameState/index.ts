import { allLevels } from './Level';

interface IGameState {
  currentLevelId: number;
}

class GameState {
  currentLevelId: number;

  constructor() {
    this.currentLevelId = 1;
  }

  save(state: IGameState) {
    if (
      state.currentLevelId <= 1 ||
      state.currentLevelId >= allLevels.getTotalCount()
    ) {
      this.currentLevelId = 1;
    } else {
      this.currentLevelId = state.currentLevelId;
    }
  }

  saveToLocalStorage() {
    const stateStringified = JSON.stringify(this);
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
    }
  }
}

const gameState = new GameState();

export default gameState;
