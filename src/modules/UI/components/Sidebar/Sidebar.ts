import { LevelDescription } from '../LevelDescription/LevelDescription';
import { LevelList } from '../LevelList/LevelList';
import sidebar from './Sidebar.html';

export class Sidebar {
  private levelDescription: LevelDescription;
  private levelList: LevelList;
  private BURGER_ID = 'burger';
  private HELP_ID = 'help';
  private LEVELS_ID = 'levels';
  private CROSS_ID = 'cross';

  constructor() {
    this.levelDescription = new LevelDescription();
    this.levelList = new LevelList();
  }

  showLevelsMenuListener() {
    const burgerEl = document.getElementById(this.BURGER_ID);
    burgerEl?.addEventListener('click', () => {
      this.hideHelp();
      this.showLevels();
    });
  }

  closeLevelsMenuListener() {
    const crossEl = document.getElementById(this.CROSS_ID);
    crossEl?.addEventListener('click', () => {
      this.showHelp();
      this.hideLevels();
    });
  }

  showHelp() {
    const helpEl = document.getElementById(this.HELP_ID);
    helpEl?.classList.remove('d-none');
  }

  hideHelp() {
    const helpEl = document.getElementById(this.HELP_ID);
    helpEl?.classList.add('d-none');
  }

  showLevels() {
    const levelsEl = document.getElementById(this.LEVELS_ID);
    levelsEl?.classList.remove('d-none');
  }

  hideLevels() {
    const levelsEl = document.getElementById(this.LEVELS_ID);
    levelsEl?.classList.add('d-none');
  }

  render() {
    return sidebar
      .replace('#DISPLAYHELP#', this.levelDescription.render())
      .replace('#LEVELDESCRIPTION#', this.levelList.render());
  }
}
