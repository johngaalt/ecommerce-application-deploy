import './styles/main.scss';

import 'bootstrap-icons/font/bootstrap-icons.scss';

import { UI } from './modules/UI';
import gameState from './modules/GameState';

document.addEventListener('DOMContentLoaded', () => {
  gameState.getFromLocalStorage();

  const ui = new UI();
  ui.initRender();
  // anime mate
  ui.initListeners();
});

window.addEventListener('beforeunload', () => {
  gameState.saveToLocalStorage();
});
