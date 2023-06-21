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

    const stateStringified = JSON.stringify(this);
    localStorage.setItem('state', stateStringified);
  }

  getState() {
    const stateStringified = localStorage.getItem('state');
    console.log('STATE', stateStringified);

    if (stateStringified) {
      const state = JSON.parse(stateStringified);
      this.currentLevelId = state.currentLevelId;
    }

    return this;
  }
}

const gameState = new GameState();

export default gameState;
