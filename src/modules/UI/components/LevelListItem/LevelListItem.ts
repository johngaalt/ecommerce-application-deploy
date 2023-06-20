import levelListItem from './LevelListItem.html';

export class LevelListItem {
  id: number;
  syntax: string;

  constructor(id: number, syntax: string) {
    this.id = id;
    this.syntax = syntax;
  }

  render() {
    return levelListItem
      .replace('#SYNTAX#', this.syntax)
      .replace('#ID#', String(this.id));
  }
}
