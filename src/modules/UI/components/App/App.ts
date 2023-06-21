import { GameWrapper } from '../GameWrapper/GameWrapper';
import { Header } from '../Header/Header';
import { LevelDescription } from '../LevelDescription/LevelDescription';
import { Sidebar } from '../Sidebar/Sidebar';
import app from './App.html';

export class App {
  private header: Header;
  private gameWrapper: GameWrapper;
  private sidebar: Sidebar;

  constructor() {
    this.header = new Header();
    this.gameWrapper = new GameWrapper();
    this.sidebar = new Sidebar();
  }

  attachListeners() {
    this.sidebar.closeLevelsMenuListener();
    this.sidebar.attachListeners();
    LevelDescription.showPreviousLevelListener();
    LevelDescription.showLevelsMenuListener();
  }

  render() {
    return app
      .replace('#HEADER#', this.header.render())
      .replace('#GAMEWRAPPER#', this.gameWrapper.render())
      .replace('#SIDEBAR#', this.sidebar.render());
  }
}
