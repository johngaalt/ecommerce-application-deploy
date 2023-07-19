import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';

export class WinnersTableView extends ElementBuilder implements View {
  table: HTMLTableElement;
  thead!: HTMLTableElement;
  headerRow!: HTMLTableRowElement;
  tbody!: HTMLTableElement;

  constructor() {
    super();

    this.table = this.createElement<HTMLTableElement>('table', {
      classes: ['table', 'w-50', 'mt-5'],
    });

    this.createTableHeader();
    this.createTableBody();
  }

  private createTableHeader() {
    this.thead = this.createElement('thead');
    this.headerRow = this.createElement('tr');

    for (let i = 0; i < 5; i++) {
      const th = this.createElement('th', {});
      th.textContent = `Header ${i + 1}`;
      this.headerRow.appendChild(th);
      this.thead.appendChild(this.headerRow);
    }

    this.table.appendChild(this.thead);
  }

  private createTableBody() {
    this.tbody = this.createElement('tbody');

    for (let i = 0; i < 7; i++) {
      const row = this.createElement('tr');

      for (let j = 0; j < 5; j++) {
        const cell = this.createElement('td');
        cell.textContent = `Row ${i + 1} Cell ${j + 1}`;
        row.appendChild(cell);
      }

      this.tbody.appendChild(row);
    }

    this.table.appendChild(this.tbody);
  }

  render() {
    const parent = this.getElement('#winners');
    if (parent) {
      parent.appendChild(this.table);
    }
  }
}
