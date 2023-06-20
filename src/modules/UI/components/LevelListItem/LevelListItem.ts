import { GameState } from '../../../../modules/GameState';
import levelListItem from './LevelListItem.html';

export class LevelListItem {
  id: number;
  syntax: string;

  constructor(id: number, syntax: string) {
    this.id = id;
    this.syntax = syntax;
  }

  checkCurrentLevel() {
    const state = GameState.getInstance().getState();
    return state.currentLevelId;
  }

  render(id: number) {
    const currentLevelId = this.checkCurrentLevel();
    const isLevelActive = id === currentLevelId;

    return levelListItem
      .replace('#SYNTAX#', this.syntax)
      .replace('#ACTIVECLASS#', isLevelActive ? 'active' : '')
      .replaceAll('#ID#', String(this.id));
  }
}
