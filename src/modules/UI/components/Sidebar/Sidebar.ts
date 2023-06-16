import { DisplayHelp } from '../DisplayHelp/DisplayHelp';
import { LevelDescription } from '../LevelDescription/LevelDescription';
import sidebar from './Sidebar.html';

export class Sidebar {
  private displayHelp: DisplayHelp;
  private levelDescription: LevelDescription;
  private BURGER_ID = 'burger';
  private HELP_ID = 'help';
  private LEVELS_ID = 'levels';
  private CROSS_ID = 'cross';

  constructor() {
    this.displayHelp = new DisplayHelp();
    this.levelDescription = new LevelDescription();
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
      .replace('#DISPLAYHELP#', this.displayHelp.render())
      .replace('#LEVELDESCRIPTION#', this.levelDescription.render());
  }
}
