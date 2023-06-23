import eventBus from 'eventBus/index';
import levelHeader from './LevelHeader.html';
import { EventTypes } from 'eventBus/EventTypes';
import { DOMGuards, ObjectGuards } from 'utils/Guards';
import { LEVELS } from 'gameState/constants/levels';
import gameState from 'gameState/index';
import { ILevel } from 'gameState/types/ILevel';

export class LevelHeader {
  private LEVEL_HEADER_ID = 'level-header';

  constructor() {
    eventBus.subscribe(
      EventTypes.selectLevelListItem,
      this.getCurrentLevelHeader.bind(this)
    );
  }

  getCurrentLevelHeader(data: unknown) {
    if (ObjectGuards.hasProp(data, 'levelId')) {
      const { doThis } = this.getCurrentLevel();

      const levelHeaderEl = document.getElementById(this.LEVEL_HEADER_ID);

      if (DOMGuards.isHTMLElement(levelHeaderEl)) {
        levelHeaderEl.innerHTML = doThis;
      }
    }
  }

  getCurrentLevel(): ILevel {
    const { currentLevelId } = gameState.get();
    const currentLevel = LEVELS.find((level) => level.id === currentLevelId);

    if (!currentLevel) {
      throw new Error(`Level with id ${currentLevelId} was not found!`);
    }

    return currentLevel;
  }

  render() {
    const { doThis } = this.getCurrentLevel();
    return levelHeader.replace('#DOTHIS#', doThis);
  }
}
