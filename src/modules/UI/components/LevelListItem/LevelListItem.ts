import eventBus from '../../../../modules/EventBus';
import gameState from '../../../../modules/GameState';
import levelListItem from './LevelListItem.html';
import { EventTypes } from '../../../../modules/EventBus/EventTypes';
import { ObjectGuards } from '../../../../modules/Utils/Guards';

export class LevelListItem {
  static dataIdSelector = '[data-id]';
  static activeSelector = '[data-id].active';

  element: HTMLElement | null = null;

  id: number;
  syntax: string;

  constructor(id: number, syntax: string) {
    this.id = id;
    this.syntax = syntax;

    eventBus.subscribe(
      EventTypes.selectLevelListItem,
      this.setActiveClass.bind(this)
    );
  }

  setActiveClass(data: unknown) {
    const currentListItem = document.querySelector('[data-id].active');
    currentListItem?.classList.remove('active');

    if (ObjectGuards.hasProp(data, 'levelId')) {
      const targetListItem = document.querySelector(
        `[data-id="${data.levelId}"]`
      );
      targetListItem?.classList.add('active');
    }
  }

  checkCurrentLevel() {
    const state = gameState.getState();
    return state.currentLevelId;
  }

  render(id: number) {
    const currentLevelId = this.checkCurrentLevel();
    const isLevelActive = id === currentLevelId;

    return levelListItem
      .replace('#SYNTAX#', this.syntax)
      .replace('#ACTIVECLASS#', isLevelActive ? 'active' : '')
      .replaceAll('#ID#', String(this.id));
  }
}
