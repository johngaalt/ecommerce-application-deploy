import eventBus from '../../../../modules/EventBus';
import { LevelDescription } from '../LevelDescription/LevelDescription';
import { LevelList } from '../LevelList/LevelList';
import sidebar from './Sidebar.html';
import { EventTypes } from '../../../../modules/EventBus/EventTypes';

export class Sidebar {
  private levelDescription: LevelDescription;
  private levelList: LevelList;
  private BURGER_ID = 'burger';
  private CROSS_ID = 'cross';

  constructor() {
    this.levelDescription = new LevelDescription();
    this.levelList = new LevelList();
  }

  showLevelsMenuListener() {
    const burgerEl = document.getElementById(this.BURGER_ID);

    burgerEl?.addEventListener('click', () => {
      eventBus.publish(EventTypes.showLevelMenu, { isShown: true });
      this.levelList.show();
    });
  }

  closeLevelsMenuListener() {
    const crossEl = document.getElementById(this.CROSS_ID);

    crossEl?.addEventListener('click', () => {
      eventBus.publish(EventTypes.showLevelMenu, { isShown: false });
      this.levelList.hide();
    });
  }

  attachListeners() {
    this.levelList.selectLevelListener();
  }

  render() {
    return sidebar
      .replace('#LEVELDESCRIPTION#', this.levelDescription.render())
      .replace('#LEVELLIST#', this.levelList.render());
  }
}
