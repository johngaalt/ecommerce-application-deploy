import { LevelDescription } from '../LevelDescription/LevelDescription';
import { LevelList } from '../LevelList/LevelList';
import sidebar from './Sidebar.html';

export class Sidebar {
  private levelDescription: LevelDescription;
  private levelList: LevelList;
  private BURGER_ID = 'burger';
  private HELP_ID = 'level-description';
  private CROSS_ID = 'cross';

  constructor() {
    this.levelDescription = new LevelDescription();
    this.levelList = new LevelList();
  }

  showLevelsMenuListener() {
    const burgerEl = document.getElementById(this.BURGER_ID);

    burgerEl?.addEventListener('click', () => {
      this.hideHelp();
      this.levelList.show();
    });
  }

  closeLevelsMenuListener() {
    const crossEl = document.getElementById(this.CROSS_ID);

    crossEl?.addEventListener('click', () => {
      this.showHelp();
      this.levelList.hide();
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

  render() {
    return sidebar
      .replace('#DISPLAYHELP#', this.levelDescription.render())
      .replace('#LEVELDESCRIPTION#', this.levelList.render());
  }
}
