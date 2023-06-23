import { Desk } from '../Table/Desk';
import { LevelHeader } from '../LevelHeader/LevelHeader';
import gameWrapper from './GameWrapper.html';
import './GameWrapper.scss';

export class GameWrapper {
  levelHeader: LevelHeader;
  table: Desk;

  constructor() {
    this.levelHeader = new LevelHeader();
    this.table = new Desk();
  }

  render() {
    return gameWrapper
      .replace('#LEVELHEADER#', this.levelHeader.render())
      .replace('#TABLE#', this.table.render());
  }
}
