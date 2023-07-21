import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';
import { WinnerAirplane } from 'types/winners.type';
import { WinnersTableModel } from './winners-table.model';

export class WinnersTableView extends ElementBuilder implements View {
  table: HTMLTableElement;
  thead!: HTMLTableElement;
  headerRow!: HTMLTableRowElement;
  tbody!: HTMLTableElement;
  headers = ['Number', 'Airplane', 'Name', 'Wins', 'Best time'];

  constructor() {
    super();

    this.table = this.createElement<HTMLTableElement>('table', {
      classes: ['table', 'mt-5'],
    });

    this.createTableHeader();
    this.tbody = this.createElement('tbody');
  }

  private createTableHeader() {
    this.thead = this.createElement('thead');
    this.headerRow = this.createElement('tr');

    for (let i = 0; i < 5; i++) {
      const th = this.createElement('th', {});
      th.textContent = this.headers[i];
      this.headerRow.appendChild(th);
      this.thead.appendChild(this.headerRow);
    }

    this.table.appendChild(this.thead);
  }

  populateTable({ winners, currentPage, limit }: WinnersTableModel) {
    this.tbody.innerHTML = '';

    winners.forEach((winner, index) => {
      const row = this.createElement('tr');

      const numberCell = this.createElement<HTMLTableCellElement>('td');
      const airplaneNumber = String((currentPage - 1) * limit + (index + 1));
      numberCell.textContent = airplaneNumber;
      row.appendChild(numberCell);

      const airplaneCell = this.createElement('td');
      const icon = this.createIcon('bi-airplane-fill');
      icon.style.color = winner.color;
      airplaneCell.appendChild(icon);
      row.appendChild(airplaneCell);

      const nameCell = this.createElement('td');
      nameCell.textContent = String(winner.name);
      row.appendChild(nameCell);

      const winsCell = this.createElement('td');
      winsCell.textContent = String(winner.wins);
      row.appendChild(winsCell);

      const timeCell = this.createElement('td');
      timeCell.textContent = String(winner.time);
      row.appendChild(timeCell);

      this.tbody.appendChild(row);
    });

    this.table.appendChild(this.tbody);
  }

  render(data: WinnersTableModel) {
    this.populateTable(data);
    const parent = this.getElement('#winners');
    if (parent) {
      parent.appendChild(this.table);
    }
  }
}
