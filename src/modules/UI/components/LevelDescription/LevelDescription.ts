import levelDescription from './LevelDescription.html';

export class LevelDescription {
  private LEVEL_DESCRIPTION_ID = 'level-description';

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
    return levelDescription;
  }
}
