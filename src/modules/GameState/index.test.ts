import { GameState } from '.';

describe('GameState', () => {
  const gameState = new GameState();

  it('should be initialized with default values', () => {
    expect(gameState).toEqual({
      currentLevelId: 1,
      tippedLevels: new Set(),
      _finishedLevels: {},
    });
  });
});
