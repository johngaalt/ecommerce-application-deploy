import eventBus from 'eventBus/index';
import { GameState } from '.';

describe('GameState', () => {
  it('should be initialized with default values', () => {
    const gameState = new GameState();

    expect(gameState).toEqual({
      currentLevelId: 1,
      tippedLevels: new Set(),
      _finishedLevels: {},
    });
  });

  it('should subscribe to event bus', () => {
    const subscribeSpy = jest.spyOn(eventBus, 'subscribe');

    new GameState();

    expect(subscribeSpy).toHaveBeenCalled();
  });
});
