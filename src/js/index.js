import '../styles/styles.scss';
import './gameboard';

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
buttonFourth.classList.add('button', 'button--fourth');

const difficulty = document.createElement('div');
difficulty.classList.add('header__difficulty');
difficulty.append(buttonFourth, buttonFirst, buttonSecond, buttonThird);

const main = document.createElement('main');
main.classList.add('container');
main.id = 'board';

header.append(score, difficulty);
document.body.append(header, main);
