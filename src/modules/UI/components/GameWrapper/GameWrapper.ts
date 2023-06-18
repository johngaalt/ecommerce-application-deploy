import { LevelHeader } from '../LevelHeader/LevelHeader';
import gameWrapper from './GameWrapper.html';
import './GameWrapper.scss';

export class GameWrapper {
  levelHeader: LevelHeader;

  constructor() {
    this.levelHeader = new LevelHeader();
  }

  render() {
    return gameWrapper.replace('#LEVELHEADER#', this.levelHeader.render());
  }
}
