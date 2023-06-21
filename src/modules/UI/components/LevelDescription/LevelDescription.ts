import { ILevel } from '../../../../modules/GameState/types/ILevel';
import gameState from '../../../../modules/GameState';
import { LEVELS } from '../../../../modules/GameState/constants/levels';
import eventBus from '../../../../modules/EventBus';
import levelDescription from './LevelDescription.html';
import { EventTypes } from '../../../../modules/EventBus/EventTypes';
import { ObjectGuards } from '../../../../modules/Utils/Guards';
import { Utils } from '../../../../modules/Utils';

export class LevelDescription {
  private LEVEL_DESCRIPTION_ID = 'level-description';
  private static BURGER_ID = 'burger';

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
    const currentLevel = LEVELS.find((level) => level.id === currentLevelId);

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

  render() {
    const level = this.getCurrentLevel();
    return levelDescription
      .replace('#ID#', String(level.id))
      .replace('#TOTAL#', String(LEVELS.length))
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
