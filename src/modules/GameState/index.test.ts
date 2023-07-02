import eventBus from 'eventBus/index';
import { GameState } from '.';

describe('GameState', () => {
  it('should be initialized with default values', () => {
    const gameState = new GameState();

    expect(gameState).toEqual({
      currentLevelId: 1,
      tippedLevels: new Set(),
      finishedLevels: {},
    });
  });

  it('should subscribe to event bus', () => {
    const subscribeSpy = jest.spyOn(eventBus, 'subscribe');

    new GameState();

    expect(subscribeSpy).toHaveBeenCalled();
  });

  describe('saveCurrentLevelId', () => {
    it('should save currentLevelId ', () => {
      const gameState = new GameState();

      gameState.saveCurrentLevelId(5);

      const { currentLevelId } = gameState.get();
      expect(currentLevelId).toBe(5);
    });

    it('should save currentLevelId as 10 when negative levelId has been passed', () => {
      const gameState = new GameState();

      gameState.saveCurrentLevelId(-1);

      const { currentLevelId } = gameState.get();
      expect(currentLevelId).toBe(10);
    });

    it('should save currentLevelId as 1 when levelId bigger then all levels count', () => {
      const gameState = new GameState();

      gameState.saveCurrentLevelId(100);

      const { currentLevelId } = gameState.get();
      expect(currentLevelId).toBe(1);
    });
  });

  describe('reset', () => {
    it('should check that game state has default value', () => {
      const gameState = new GameState();
      gameState.saveCurrentLevelId(100);

      gameState.reset();

      const resetGameState = gameState.get();
      expect(resetGameState).toEqual({
        currentLevelId: 1,
        tippedLevels: new Set(),
        finishedLevels: {},
      });
    });
  });
});
