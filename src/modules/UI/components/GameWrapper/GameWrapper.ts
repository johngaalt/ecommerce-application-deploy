import { Desk } from '../Desk/Desk';
import { LevelHeader } from '../LevelHeader/LevelHeader';
import gameWrapper from './GameWrapper.html';
import './GameWrapper.scss';
import { Editor } from 'components/Editor/Editor';

export class GameWrapper {
  levelHeader: LevelHeader;
  table: Desk;
  editor: Editor;

  constructor() {
    this.levelHeader = new LevelHeader();
    this.table = new Desk();
    this.editor = new Editor();
  }

  render() {
    return gameWrapper
      .replace('#LEVELHEADER#', this.levelHeader.render())
      .replace('#TABLE#', this.table.render())
      .replace('#EDITOR#', this.editor.render());
  }
}
