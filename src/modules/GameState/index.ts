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

    if (stateStringified) {
      const state = JSON.parse(stateStringified);
      this.currentLevelId = state.currentLevelId;
    }

    console.log('STATE', this);
    return this;
  }
}

let gameState: GameState;

export function getGame() {
  if (gameState) {
    return gameState;
  }

  gameState = new GameState();
  return gameState;
}
