import { LEVELS } from '../../../../modules/GameState/constants/levels';
import { Guards } from '../../../../modules/Utils/Guards';
import { LevelListItem } from '../LevelListItem/LevelListItem';
import levelList from './LevelList.html';

export class LevelList {
  private LEVELS_ID = 'level-list';
  private LEVEL_LIST = 'levels-list';
  private levelsElements: string[] = [];

  constructor() {
    this.levelsElements = LEVELS.map((level) =>
      new LevelListItem(level.id, level.syntax).render()
    );
  }

  selectLevelListener() {
    const levelsListEl = document.getElementById(this.LEVEL_LIST);

    levelsListEl?.addEventListener('click', (event) => {
      const target = event.target;
      const isHTMLElement = Guards.isHTMLElement(target);

      if (isHTMLElement) {
        const currentListItem = document.querySelector('[data-id].active');
        currentListItem?.classList.remove('active');

        const targetListItem = target?.closest('[data-id]');
        targetListItem?.classList.add('active');
      }
    });
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
