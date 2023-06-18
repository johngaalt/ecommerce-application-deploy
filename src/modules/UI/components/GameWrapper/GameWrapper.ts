import { Table } from '../Table/Table';
import { LevelHeader } from '../LevelHeader/LevelHeader';
import gameWrapper from './GameWrapper.html';
import './GameWrapper.scss';

export class GameWrapper {
  levelHeader: LevelHeader;
  table: Table;

  constructor() {
    this.levelHeader = new LevelHeader();
    this.table = new Table();
  }

  render() {
    return gameWrapper
      .replace('#LEVELHEADER#', this.levelHeader.render())
      .replace('#TABLE#', this.table.render());
  }
}
