import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';
import { WinnersTableModel } from './winners-table.model';
import { DOMGuards } from 'utils/guards';
import { OrderOptions, SortOptions } from 'types/winners.type';

export class WinnersTableView extends ElementBuilder implements View {
  table: HTMLTableElement;
  thead!: HTMLTableElement;
  headerRow!: HTMLTableRowElement;
  tbody!: HTMLTableElement;
  icon!: HTMLElement;
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
      const th = this.createElement('th', {
        dataset: [{ column: this.headers[i] }],
      });
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

  tableHeaderClickListener(
    cb: (sort?: SortOptions, order?: OrderOptions) => void,
  ) {
    this.thead.addEventListener('click', (event) => {
      const target = event.target;

      if (DOMGuards.isHTMLElement(target)) {
        const column = target.closest('[data-column]');

        if (!DOMGuards.isHTMLElement(column)) return;

        if (column?.dataset.column === 'Wins') {
          this.sortBy('wins', column, cb);
        }

        if (column?.dataset.column === 'Best time') {
          this.sortBy('time', column, cb);
        }
      }
    });
  }

  private sortBy(
    sortType: SortOptions,
    column: HTMLElement,
    cb: (sort?: SortOptions, order?: OrderOptions) => void,
  ) {
    this.icon?.remove();

    const order = column.dataset.order;
    if (!order) {
      cb(sortType, 'ASC');
      column.dataset.order = 'ASC' as OrderOptions;
      this.icon = this.createIcon('bi-sort-down-alt');
      this.icon.classList.add('ms-2');
      column.appendChild(this.icon);
    }

    if (order === 'ASC') {
      cb(sortType, 'DESC');
      column.dataset.order = 'DESC' as OrderOptions;
      this.icon = this.createIcon('bi-sort-down');
      this.icon.classList.add('ms-2');
      column.appendChild(this.icon);
    }

    if (order === 'DESC') {
      cb();
      delete column.dataset.order;
    }
  }

  render(data: WinnersTableModel) {
    this.populateTable(data);
    const parent = this.getElement('#winners');
    if (parent) {
      parent.appendChild(this.table);
    }
  }
}
