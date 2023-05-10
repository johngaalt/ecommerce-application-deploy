import 'bootstrap/dist/css/bootstrap.min.css';
import './button';

const MIN_ROWS_COUNT = 10;
const MIN_COLUMNS_COUNT = 10;

const rows = new Array(MIN_ROWS_COUNT).fill(null).map(() => {
  const row = document.createElement('div');
  row.classList.add('row', 'g-5');

  const columns = new Array(MIN_COLUMNS_COUNT).fill(null).map(() => {
    const column = document.createElement('div');
    column.classList.add('col');
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'MINE';
    column.appendChild(button);
    return column;
  });

  row.append(...columns);
  return row;
});

const container = document.createElement('main');
container.classList.add('container');
container.append(...rows);

document.body.append(container);
