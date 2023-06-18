import { LevelListItem } from '../LevelListItem/LevelListItem';
import levelList from './LevelList.html';

export class LevelList {
  private LEVELS_ID = 'level-list';
  private levels: LevelListItem[] = [];
  private levelListItem: LevelListItem;

  constructor() {
    this.levelListItem = new LevelListItem();
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
    return levelList.replace('#LEVELLISTITEMS#', this.levelListItem.render());
  }
}
