import './Victory.scss';
import eventBus from 'eventBus/index';
import victory from './Victory.html';
import { EventTypes } from 'eventBus/EventTypes';
import gameState from 'gameState/index';
import { allLevels } from 'gameState/Level';

export class Victory {
  VICTORY_ID = 'victory';

  constructor() {
    eventBus.subscribe(
      EventTypes.finishLevel,
      this.showVictoryAnimation.bind(this)
    );
  }

  showVictoryAnimation() {
    const { finishedLevels } = gameState.get();
    if (finishedLevels.size === allLevels.getTotalCount()) {
      const victoryEl = document.getElementById(this.VICTORY_ID);
      if (victoryEl) {
        victoryEl.classList.remove('hidden', 'h-0');
      }
    }
  }

  render() {
    return victory;
  }
}
