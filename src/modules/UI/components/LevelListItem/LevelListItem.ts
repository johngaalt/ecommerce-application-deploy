import eventBus from '../../../../modules/EventBus';
import gameState from '../../../../modules/GameState';
import levelListItem from './LevelListItem.html';
import { EventTypes } from '../../../../modules/EventBus/EventTypes';
import { ObjectGuards } from '../../../../modules/Utils/Guards';

export class LevelListItem {
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

  markCheckAsFinished() {
    const { finishedLevels } = gameState.get();

    Array.from(finishedLevels).forEach((levelId) => {
      const currentCheckIcon = document.querySelector(
        `[data-id="${levelId}"] .bi-check`
      );

      console.log(currentCheckIcon);
      currentCheckIcon?.classList.add('text-success');
    });
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
    const state = gameState.get();
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
