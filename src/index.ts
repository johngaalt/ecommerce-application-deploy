import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import './styles/main.scss';
import 'bootstrap-icons/font/bootstrap-icons.scss';

import { UI } from './modules/UI';
import gameState from './modules/GameState';

document.addEventListener('DOMContentLoaded', () => {
  gameState.getFromLocalStorage();

  const ui = new UI();
  ui.initRender();
  ui.initEditors();
  ui.initListeners();
});

window.addEventListener('beforeunload', () => {
  gameState.saveToLocalStorage();
});
