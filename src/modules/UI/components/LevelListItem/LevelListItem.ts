import gameState from '../../../../modules/GameState';
import levelListItem from './LevelListItem.html';

export class LevelListItem {
  static dataIdSelector = '[data-id]';
  static activeSelector = '[data-id].active';

  element: HTMLElement | null = null;

  id: number;
  syntax: string;

  constructor(id: number, syntax: string) {
    this.id = id;
    this.syntax = syntax;
  }

  attachEventListener() {
    this.element = document.querySelector('[data-id]');
    this.element?.addEventListener('click', () => {
      return;
    });
  }

  checkCurrentLevel() {
    const state = gameState.getState();
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
