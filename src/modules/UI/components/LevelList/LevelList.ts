import { LEVELS } from '../../../../modules/GameState/constants/levels';
import { LevelListItem } from '../LevelListItem/LevelListItem';
import levelList from './LevelList.html';

export class LevelList {
  private LEVELS_ID = 'level-list';
  private levelsElements: string[] = [];

  constructor() {
    this.levelsElements = LEVELS.map((level) =>
      new LevelListItem(level.id, level.syntax).render()
    );
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
