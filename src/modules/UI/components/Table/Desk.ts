import { EventTypes } from 'eventBus/EventTypes';
import eventBus from 'eventBus/index';
import { allLevels } from 'gameState/Level';
import gameState from 'gameState/index';
import { ILevel } from 'gameState/types/ILevel';
import { ObjectGuards, DOMGuards } from 'utils/Guards';
import desk from './Desk.html';
import './Desk.scss';

export class Desk {
  private DESK_ID = 'desk';

  constructor() {
    eventBus.subscribe(
      EventTypes.selectLevelListItem,
      this.getCurrentLevelHeader.bind(this)
    );
  }

  getCurrentLevelHeader(data: unknown) {
    if (ObjectGuards.hasProp(data, 'levelId')) {
      const { boardMarkup } = this.getCurrentLevel();

      const deskEl = document.getElementById(this.DESK_ID);

      if (DOMGuards.isHTMLElement(deskEl)) {
        deskEl.innerHTML = boardMarkup;
      }
    }
  }

  getCurrentLevel(): ILevel {
    const { currentLevelId } = gameState.get();
    return allLevels.getCurrentLevel(currentLevelId);
  }

  render() {
    const { boardMarkup } = this.getCurrentLevel();
    return desk.replace('#DESK#', boardMarkup);
  }
}
