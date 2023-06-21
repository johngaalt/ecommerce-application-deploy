import eventBus from '../../../../modules/EventBus';
import { LevelDescription } from '../LevelDescription/LevelDescription';
import { LevelList } from '../LevelList/LevelList';
import sidebar from './Sidebar.html';
import { EventTypes } from '../../../../modules/EventBus/EventTypes';

export class Sidebar {
  private levelDescription: LevelDescription;
  private levelList: LevelList;
  private CROSS_ID = 'cross';

  constructor() {
    this.levelDescription = new LevelDescription();
    this.levelList = new LevelList();

    eventBus.subscribe(
      EventTypes.selectLevelListItem,
      this.publishCloseLevelsMenu
    );
  }

  closeLevelsMenuListener() {
    const crossEl = document.getElementById(this.CROSS_ID);

    crossEl?.addEventListener('click', () => {
      this.publishCloseLevelsMenu();
    });
  }

  private publishCloseLevelsMenu() {
    eventBus.publish(EventTypes.showLevelMenu, { isShown: false });
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
