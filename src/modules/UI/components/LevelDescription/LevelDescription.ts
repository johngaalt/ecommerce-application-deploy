import { ILevel } from '../../../../modules/GameState/types/ILevel';
import levelDescription from './LevelDescription.html';
import { getGame } from '../../../../modules/GameState';
import { LEVELS } from '../../../../modules/GameState/constants/levels';

export class LevelDescription {
  private LEVEL_DESCRIPTION_ID = 'level-description';

  getCurrentLevel(): ILevel {
    const { currentLevelId } = getGame().getState();
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
