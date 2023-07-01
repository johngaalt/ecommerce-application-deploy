import { EventTypes } from 'eventBus/EventTypes';
import eventBus from 'eventBus/index';
import { App } from './components/App/App';
import gameState from 'gameState/index';
import { allLevels } from 'gameState/Level';
import { Editor } from 'components/Editor/Editor';

export class UI {
  private app: App;
  private editor: Editor;

  constructor() {
    this.app = new App();
    this.editor = new Editor();

    eventBus.subscribe(EventTypes.selectLevelListItem, this.animate.bind(this));
    eventBus.subscribe(EventTypes.resetProgress, this.update.bind(this));
  }

  update() {
    this.initRender();
    this.initEditors();
    this.initListeners();
  }

  decorate() {
    document.body.classList.add('text-bg-dark', 'h-100', 'position-relative');
    document.body.dataset.bsTheme = 'dark';
  }

  initListeners() {
    this.app.attachListeners();
  }

  animate() {
    const { currentLevelId } = gameState.get();
    const { selector } = allLevels.getCurrentLevel(currentLevelId);
    const desk = document.getElementById('desk');

    if (desk) {
      const targetElements = desk.querySelectorAll(selector);
      targetElements?.forEach((element) => element.classList.add('strobe'));
    }
  }

  initRender() {
    this.decorate();
    document.body.innerHTML = this.app.render();
    this.animate();
  }

  initEditors() {
    this.editor.initCSSEditor();
    this.editor.initHTMLEditor();
  }
}
