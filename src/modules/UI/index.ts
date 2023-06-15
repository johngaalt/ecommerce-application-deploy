import { Header } from './components/Header/Header';
import { createGameWrapper } from './components/GameWrapper/GameWrapper';

export class UI {
  decorate() {
    document.body.classList.add('text-bg-dark');
    document.body.dataset.bsTheme = 'dark';
  }

  initRender() {
    const header = new Header();
    const gameWrapper = createGameWrapper();

    this.decorate();
    document.body.innerHTML = header.render() + gameWrapper;
  }
}
