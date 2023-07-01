import { EventTypes } from 'eventBus/EventTypes';
import eventBus from '../../../../modules/EventBus';
import gameState from '../../../../modules/GameState';
import { DOMGuards, ObjectGuards } from '../../../../modules/Utils/Guards';
import { LevelListItem } from '../LevelListItem/LevelListItem';
import levelList from './LevelList.html';
import { allLevels } from 'gameState/Level';

export class LevelList {
  private static RESET_ID = 'reset-button';
  private LEVELS_ID = 'level-list';
  private TITLE_CHECK_ID = 'title-check';
  private LEVEL_LIST_ID = 'levels-list';

  private levelsElements: string[] = [];

  static resetGameListener() {
    const resetButton = document.getElementById(LevelList.RESET_ID);

    resetButton?.addEventListener('click', LevelList.resetProgress);
  }

  static resetProgress() {
    gameState.reset();
    eventBus.publish(EventTypes.resetProgress, undefined);
  }

  constructor() {
    eventBus.subscribe(EventTypes.showLevelMenu, this.toggle.bind(this));
    eventBus.subscribe(
      EventTypes.finishLevel,
      this.markCheckAsFinished.bind(this)
    );

    this.levelsElements = allLevels
      .getItems()
      .map((level) =>
        new LevelListItem(level.id, level.syntax).render(level.id)
      );
  }

  markCheckAsFinished() {
    const { finishedLevels } = gameState.get();

    Object.values(finishedLevels).forEach((levelId) => {
      const currentCheckIcon = document.querySelector(
        `[data-id="${levelId}"] > .bi-check-lg`
      );
      currentCheckIcon?.classList.add('text-success');
    });

    const titleCheck = document.getElementById(this.TITLE_CHECK_ID);
    if (titleCheck) {
      titleCheck.classList.add('text-success');
    }
  }

  selectLevelListener() {
    const levelsListEl = document.getElementById(this.LEVEL_LIST_ID);

    levelsListEl?.addEventListener('click', (event) => {
      const target = event.target;

      if (DOMGuards.isHTMLElement(target)) {
        const targetListItem = target?.closest('[data-id]');

        if (DOMGuards.isHTMLElement(targetListItem)) {
          const levelId = Number(targetListItem.dataset.id);

          gameState.saveCurrentLevelId(levelId);

          eventBus.publish(EventTypes.selectLevelListItem, { levelId });
        }
      }
    });
  }

  toggle(data: unknown) {
    if (ObjectGuards.hasProp(data, 'isShown')) {
      if (data.isShown) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  show() {
    const levelsEl = document.getElementById(this.LEVELS_ID);
    levelsEl?.classList.remove('d-none');
  }

  hide() {
    const levelsEl = document.getElementById(this.LEVELS_ID);
    levelsEl?.classList.add('d-none');
  }

  render() {
    return levelList.replace('#LEVELLISTITEMS#', this.levelsElements.join(''));
  }
}
