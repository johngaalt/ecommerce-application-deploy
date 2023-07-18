import { View } from 'interfaces/view';

export class WinnersTableView extends View {
  table: HTMLTableElement;

  constructor() {
    super();

    this.table = this.createElement<HTMLTableElement>('table', {
      classes: ['table-info', 'w-50'],
    });

    // Create table header
    const thead = this.createElement('thead');
    const headerRow = this.createElement('tr');

    for (let i = 0; i < 5; i++) {
      const th = this.createElement('th', {});
      th.textContent = `Header ${i + 1}`;
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    this.table.appendChild(thead);

    // Create table body
    const tbody = this.createElement('tbody');

    for (let i = 0; i < 7; i++) {
      const row = this.createElement('tr');
      for (let j = 0; j < 5; j++) {
        const cell = this.createElement('td');
        cell.textContent = `Row ${i + 1} Cell ${j + 1}`;
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }

    this.table.appendChild(tbody);

    // Append table to a parent element
    const parent = this.getElement('#parent');
    if (parent) {
      parent.appendChild(this.table);
    }
  }
}
