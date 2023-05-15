import '../styles/styles.scss';

const MIN_ROWS_COUNT = 10;
const MIN_COLUMNS_COUNT = 10;
const total = MIN_ROWS_COUNT * MIN_COLUMNS_COUNT;

const cells = new Array(total).fill(null).map(() => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  return cell;
});

const header = document.createElement('header');
header.classList.add('header');

const score = document.createElement('div');
score.classList.add('header__score');
score.textContent = 'score';

const buttonFirst = document.createElement('button');
buttonFirst.textContent = 'easy';
const buttonSecond = document.createElement('button');
buttonSecond.textContent = 'medium';
const buttonThird = document.createElement('button');
buttonThird.textContent = 'hard';
const buttonFourth = document.createElement('button');
buttonFourth.textContent = 'reset';

buttonFirst.classList.add('button', 'button--first');
buttonSecond.classList.add('button', 'button--second');
buttonThird.classList.add('button', 'button--third');
buttonThird.classList.add('button', 'button--fourth');

const difficulty = document.createElement('div');
difficulty.classList.add('header__difficulty');
difficulty.append(buttonFirst, buttonSecond, buttonThird, buttonFourth);

const container = document.createElement('main');
container.classList.add('container');
container.append(...cells);
header.append(score, difficulty);

document.body.append(header, container);
