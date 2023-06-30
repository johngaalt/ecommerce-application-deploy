import { Editor } from 'components/Editor/Editor';
import { GameWrapper } from '../GameWrapper/GameWrapper';
import { Header } from '../Header/Header';
import { LevelDescription } from '../LevelDescription/LevelDescription';
import { Sidebar } from '../Sidebar/Sidebar';
import app from './App.html';
import { Footer } from 'components/Footer/Footer';
import { LevelList } from 'components/LevelList/LevelList';
import eventBus from 'eventBus/index';
import { EventTypes } from 'eventBus/EventTypes';

export class App {
  private header: Header;
  private gameWrapper: GameWrapper;
  private sidebar: Sidebar;
  private footer: Footer;

  constructor() {
    this.header = new Header();
    this.gameWrapper = new GameWrapper();
    this.sidebar = new Sidebar();
    this.footer = new Footer();
  }

  attachListeners() {
    this.sidebar.closeLevelsMenuListener();
    this.sidebar.attachListeners();
    LevelDescription.showPreviousLevelListener();
    LevelDescription.showLevelsMenuListener();
    LevelDescription.showNextLevelListener();
    Editor.changeInputValueListener();
    Editor.compareAnswerButtonListener();
    LevelList.resetGameListener();
  }

  render() {
    return app
      .replace('#HEADER#', this.header.render())
      .replace('#GAMEWRAPPER#', this.gameWrapper.render())
      .replace('#FOOTER#', this.footer.render())
      .replace('#SIDEBAR#', this.sidebar.render());
  }
}
