import { ILevel } from '../../../../modules/GameState/types/ILevel';
import gameState from '../../../../modules/GameState';
import eventBus from '../../../../modules/EventBus';
import levelDescription from './LevelDescription.html';
import { EventTypes } from '../../../../modules/EventBus/EventTypes';
import { ObjectGuards } from '../../../../modules/Utils/Guards';
import { Utils } from '../../../../modules/Utils';
import { allLevels } from 'gameState/Level';

export class LevelDescription {
  private static BURGER_ID = 'burger';
  private static ARROW_LEFT_ID = 'left-arrow';
  private static ARROW_RIGHT_ID = 'right-arrow';

  private LEVEL_DESCRIPTION_ID = 'level-description';

  private static triggerShowLevelMenuEvent() {
    eventBus.publish(EventTypes.showLevelMenu, { isShown: true });
  }

  static showLevelsMenuListener() {
    const burgerEl = document.getElementById(this.BURGER_ID);

    burgerEl?.addEventListener(
      'click',
      LevelDescription.triggerShowLevelMenuEvent
    );
  }

  static removeShowLevelsMenuListener() {
    const burgerEl = document.getElementById(this.BURGER_ID);

    burgerEl?.removeEventListener(
      'click',
      LevelDescription.triggerShowLevelMenuEvent
    );
  }

  static showPreviousLevelListener() {
    const leftArrow = document.getElementById(this.ARROW_LEFT_ID);

    leftArrow?.addEventListener(
      'click',
      LevelDescription.triggerSelectPreviousLevelEvent
    );
  }

  static removeShowPreviousLevelListener() {
    const leftArrow = document.getElementById(this.ARROW_LEFT_ID);

    leftArrow?.removeEventListener(
      'click',
      LevelDescription.triggerSelectPreviousLevelEvent
    );
  }

  private static triggerSelectPreviousLevelEvent() {
    let previousLevelId;
    const { currentLevelId } = gameState.get();

    if (currentLevelId <= 1) {
      previousLevelId = allLevels.getTotalCount();
    } else {
      previousLevelId = currentLevelId - 1;
    }

    gameState.save({
      currentLevelId: previousLevelId,
    });

    eventBus.publish(EventTypes.selectLevelListItem, {
      levelId: previousLevelId,
    });
  }

  static showNextLevelListener() {
    const rightArrow = document.getElementById(this.ARROW_RIGHT_ID);

    rightArrow?.addEventListener(
      'click',
      LevelDescription.triggerSelectNextLevelEvent
    );
  }

  private static triggerSelectNextLevelEvent() {
    const { currentLevelId } = gameState.get();
    let nextLevelId;

    if (currentLevelId >= allLevels.getTotalCount()) {
      nextLevelId = 1;
    } else {
      nextLevelId = currentLevelId - 1;
    }

    gameState.save({
      currentLevelId: nextLevelId,
    });

    eventBus.publish(EventTypes.selectLevelListItem, {
      levelId: nextLevelId,
    });
  }

  static removeShowNextLevelListener() {
    const rightArrow = document.getElementById(this.ARROW_RIGHT_ID);

    rightArrow?.removeEventListener(
      'click',
      LevelDescription.triggerSelectNextLevelEvent
    );
  }

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
      LevelDescription.removeShowLevelsMenuListener();
      LevelDescription.removeShowPreviousLevelListener();
      LevelDescription.removeShowNextLevelListener();

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
