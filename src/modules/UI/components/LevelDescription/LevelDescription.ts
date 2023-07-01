import { ILevel } from '../../../../modules/GameState/types/ILevel';
import gameState from '../../../../modules/GameState';
import eventBus from '../../../../modules/EventBus';
import levelDescription from './LevelDescription.html';
import { EventTypes } from '../../../../modules/EventBus/EventTypes';
import { DOMGuards, ObjectGuards } from '../../../../modules/Utils/Guards';
import { Utils } from '../../../../modules/Utils';
import { allLevels } from 'gameState/Level';
import { Editor } from 'components/Editor/Editor';

export class LevelDescription {
  private static BURGER_ID = 'burger';
  private static ARROW_LEFT_ID = 'left-arrow';
  private static ARROW_RIGHT_ID = 'right-arrow';
  private static HELP_ID = 'help-button';

  private LEVEL_DESCRIPTION_ID = 'level-description';

  private static triggerShowLevelMenuEvent() {
    eventBus.publish(EventTypes.showLevelMenu, { isShown: true });
  }

  static helpButtonListener() {
    const helpButton = document.getElementById(this.HELP_ID);

    helpButton?.addEventListener('click', LevelDescription.typeAnswer);
  }

  static typeAnswer() {
    const input = document.getElementById(Editor.SELECTOR_INPUT_ID);
    const { currentLevelId } = gameState.get();
    const { selector } = allLevels.getCurrentLevel(currentLevelId);

    if (DOMGuards.isHTMLInputElement(input)) {
      input.value = '';
    }

    let index = 0;

    function typeNextCharacter() {
      if (index < selector.length) {
        const char = selector.charAt(index);
        if (DOMGuards.isHTMLInputElement(input)) {
          input.value += char;
        }
        index++;
        setTimeout(typeNextCharacter, 100); // Delay between typing each character
      }
    }

    typeNextCharacter();

    eventBus.publish(EventTypes.solvedWithTipLevel, {
      levelId: currentLevelId,
    });
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
    const { currentLevelId } = gameState.get();
    const previousLevelId = currentLevelId - 1;

    gameState.saveCurrentLevelId(previousLevelId);

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
    const nextLevelId = currentLevelId + 1;

    gameState.saveCurrentLevelId(nextLevelId);

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
      LevelDescription.helpButtonListener();
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
    return allLevels.getCurrentLevel(currentLevelId);
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
    const { finishedLevels } = gameState.get();
    const isFinishedLevel = finishedLevels[level.id];
    const isFinishedLevelWithTip = isFinishedLevel?.withTip;

    let checkMarkClassName = '';
    if (isFinishedLevel && isFinishedLevelWithTip) {
      checkMarkClassName = 'text-warning';
    } else if (isFinishedLevel) {
      checkMarkClassName = 'text-success';
    } else {
      checkMarkClassName = '';
    }

    return levelDescription
      .replace('100', String(progress))
      .replace('#ID#', String(level.id))
      .replace('#TOTAL#', String(totalLevels))
      .replace('#SELECTORNAME#', level.selectorName ?? '')
      .replace('#FINISHEDCLASS#', checkMarkClassName)
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
