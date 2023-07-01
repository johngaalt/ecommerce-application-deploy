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

  render(id: number) {
    const { currentLevelId, finishedLevels } = gameState.get();
    const isLevelActive = id === currentLevelId;

    const isFinishedLevel = finishedLevels[id];
    const isFinishedLevelWithTip = isFinishedLevel?.withTip;

    let checkMarkClassName = '';
    if (isFinishedLevel && isFinishedLevelWithTip) {
      checkMarkClassName = 'text-warning';
    } else if (isFinishedLevel) {
      checkMarkClassName = 'text-success';
    } else {
      checkMarkClassName = '';
    }

    return levelListItem
      .replace('#SYNTAX#', this.syntax)
      .replace('#ACTIVECLASS#', isLevelActive ? 'active' : '')
      .replace('#FINISHEDCLASS#', checkMarkClassName)
      .replaceAll('#ID#', String(this.id));
  }
}
