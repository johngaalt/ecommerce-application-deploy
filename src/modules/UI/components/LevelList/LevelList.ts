import { EventTypes } from '../../../../modules/EventBus/EventTypes';
import eventBus from '../../../../modules/EventBus';
import gameState from '../../../../modules/GameState';
import { LEVELS } from '../../../../modules/GameState/constants/levels';
import { DOMGuards, ObjectGuards } from '../../../../modules/Utils/Guards';
import { LevelListItem } from '../LevelListItem/LevelListItem';
import levelList from './LevelList.html';

export class LevelList {
  private LEVELS_ID = 'level-list';
  private LEVEL_LIST = 'levels-list';
  private levelsElements: string[] = [];

  constructor() {
    eventBus.subscribe(EventTypes.showLevelMenu, this.toggle.bind(this));

    this.levelsElements = LEVELS.map((level) =>
      new LevelListItem(level.id, level.syntax).render(level.id)
    );
  }

  selectLevelListener() {
    const levelsListEl = document.getElementById(this.LEVEL_LIST);

    levelsListEl?.addEventListener('click', (event) => {
      const target = event.target;

      if (DOMGuards.isHTMLElement(target)) {
        const currentListItem = document.querySelector('[data-id].active');
        currentListItem?.classList.remove('active');

        const targetListItem = target?.closest('[data-id]');

        if (DOMGuards.isHTMLElement(targetListItem)) {
          eventBus.publish(EventTypes.selectLevelListItem, { dummyData: 1 });

          targetListItem.classList.add('active');

          gameState.saveGameState({
            currentLevelId: Number(targetListItem.dataset.id),
          });
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
