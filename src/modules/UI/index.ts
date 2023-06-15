import { App } from './components/App/App';

export class UI {
  private app: App;

  constructor() {
    this.app = new App();
  }
  decorate() {
    document.body.classList.add('text-bg-dark');
    document.body.dataset.bsTheme = 'dark';
  }

  initRender() {
    this.decorate();
    document.body.innerHTML = this.app.render();
  }
}
