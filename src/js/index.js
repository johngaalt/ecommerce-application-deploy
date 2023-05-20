import '../styles/styles.scss';
import './gameboard';

const header = document.createElement('header');
header.classList.add('header');

const timer = document.createElement('div');
timer.classList.add('timer');
timer.textContent = 0;

const movesCounter = document.createElement('div');
movesCounter.classList.add('moves-counter');
movesCounter.textContent = 0;

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

const footer = document.createElement('footer');
footer.classList.add('footer');
footer.id = 'footer';

header.append(timer, difficulty, movesCounter);
document.body.append(header, main, footer);
