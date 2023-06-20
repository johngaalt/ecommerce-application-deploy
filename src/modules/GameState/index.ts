interface IGameState {
  currentLevelId: number;
}

export class GameState {
  private static instance: GameState;

  currentLevelId: number;

  constructor() {
    this.currentLevelId = 1;
  }

  static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }
    return GameState.instance;
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
