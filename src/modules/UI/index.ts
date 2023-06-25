import { EventTypes } from 'eventBus/EventTypes';
import eventBus from 'eventBus/index';
import { App } from './components/App/App';
import gameState from 'gameState/index';
import { allLevels } from 'gameState/Level';

export class UI {
  private app: App;

  constructor() {
    this.app = new App();

    eventBus.subscribe(EventTypes.selectLevelListItem, this.animate.bind(this));
  }

  decorate() {
    document.body.classList.add('text-bg-dark', 'h-100');
    document.body.dataset.bsTheme = 'dark';
  }

  initListeners() {
    this.app.attachListeners();
  }

  animate() {
    const { currentLevelId } = gameState.get();
    const { selector } = allLevels.getCurrentLevel(currentLevelId);
    const targetElements = document.querySelectorAll(selector);
    targetElements?.forEach((element) => element.classList.add('strobe'));
  }

  initRender() {
    this.decorate();
    document.body.innerHTML = this.app.render();
    this.animate();
  }
}
