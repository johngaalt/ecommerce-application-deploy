interface IGameState {
  currentLevelId: number;
}

class GameState {
  currentLevelId: number;

  constructor() {
    this.currentLevelId = 1;
  }

  saveGameState(state: IGameState) {
    this.currentLevelId = state.currentLevelId;
  }

  saveToLocalStorage() {
    const stateStringified = JSON.stringify(this);
    localStorage.setItem('state', stateStringified);
  }

  getState() {
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
