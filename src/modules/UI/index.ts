import { App } from './components/App/App';

export class UI {
  private app: App;

  constructor() {
    this.app = new App();
  }

  decorate() {
    document.body.classList.add('text-bg-dark', 'h-100');
    document.body.dataset.bsTheme = 'dark';
  }

  initListeners() {
    this.app.attachListeners();
  }

  initRender() {
    this.decorate();
    document.body.innerHTML = this.app.render();
  }
}
