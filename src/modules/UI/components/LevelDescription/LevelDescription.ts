import { ILevel } from '../../../../modules/GameState/types/ILevel';
import gameState from '../../../../modules/GameState';
import eventBus from '../../../../modules/EventBus';
import levelDescription from './LevelDescription.html';
import { EventTypes } from '../../../../modules/EventBus/EventTypes';
import { ObjectGuards } from '../../../../modules/Utils/Guards';
import { Utils } from '../../../../modules/Utils';
import { allLevels } from 'gameState/Level';

export class LevelDescription {
  private LEVEL_DESCRIPTION_ID = 'level-description';
  private static BURGER_ID = 'burger';
  private static ARROW_LEFT_ID = 'left-arrow';
  private static ARROW_RIGHT_ID = 'right-arrow';

  constructor() {
    eventBus.subscribe(EventTypes.showLevelMenu, this.toggle.bind(this));
    eventBus.subscribe(
      EventTypes.selectLevelListItem,
      this.updateLevelDescription.bind(this)
    );
  }

  updateLevelDescription() {
    const levelDescriptionEl = document.getElementById(
      this.LEVEL_DESCRIPTION_ID
    );
    const newLevelDescriptionEl = Utils.convertStringToNode(this.render());

    if (newLevelDescriptionEl) {
      // remove event listener
      levelDescriptionEl?.replaceWith(newLevelDescriptionEl);
      LevelDescription.showLevelsMenuListener();
      LevelDescription.showPreviousLevelListener();
      LevelDescription.showNextLevelListener();
    }
  }

  toggle(data: unknown) {
    if (ObjectGuards.hasProp(data, 'isShown')) {
      if (data.isShown) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  getCurrentLevel(): ILevel {
    const { currentLevelId } = gameState.get();
    const currentLevel = allLevels.getCurrentLevel(currentLevelId);

    if (!currentLevel) {
      throw new Error(`Level with id ${currentLevelId} was not found!`);
    }

    return currentLevel;
  }

  show() {
    const levelDescriptionEl = document.getElementById(
      this.LEVEL_DESCRIPTION_ID
    );
    levelDescriptionEl?.classList.remove('d-none');
  }

  hide() {
    const levelDescriptionEl = document.getElementById(
      this.LEVEL_DESCRIPTION_ID
    );
    levelDescriptionEl?.classList.add('d-none');
  }

  static showLevelsMenuListener() {
    const burgerEl = document.getElementById(this.BURGER_ID);

    burgerEl?.addEventListener('click', () => {
      eventBus.publish(EventTypes.showLevelMenu, { isShown: true });
    });
  }

  static showPreviousLevelListener() {
    const leftArrow = document.getElementById(this.ARROW_LEFT_ID);

    leftArrow?.addEventListener('click', () => {
      const { currentLevelId } = gameState.get();
      const previousLevelId = currentLevelId - 1;

      gameState.save({
        currentLevelId: previousLevelId,
      });

      eventBus.publish(EventTypes.selectLevelListItem, {
        levelId: previousLevelId,
      });
    });
  }

  static showNextLevelListener() {
    const rightArrow = document.getElementById(this.ARROW_RIGHT_ID);

    rightArrow?.addEventListener('click', () => {
      const { currentLevelId } = gameState.get();
      const previousLevelId = currentLevelId + 1;

      gameState.save({
        currentLevelId: previousLevelId,
      });

      eventBus.publish(EventTypes.selectLevelListItem, {
        levelId: previousLevelId,
      });
    });
  }

  render() {
    const level = this.getCurrentLevel();
    const totalLevels = allLevels.getTotalCount();
    const progress = (level.id / totalLevels) * 100;

    return levelDescription
      .replace('100', String(progress))
      .replace('#ID#', String(level.id))
      .replace('#TOTAL#', String(totalLevels))
      .replace('#SELECTORNAME#', level.selectorName ?? '')
      .replace('#HELPTITLE#', level.helpTitle ?? '')
      .replace('#SYNTAX#', level.syntax)
      .replace('#HELP#', level.help ?? '')
      .replace(
        '#EXAMPLES#',
        level.examples
          ?.map(
            (example) =>
              `<div class="example fs-6 border-bottom pb-3 mt-3">${example}</div>`
          )
          .join('') ?? ''
      );
  }
}
