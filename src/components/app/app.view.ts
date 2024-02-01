import { ElementBuilder } from 'interfaces/element-builder';

export class AppView extends ElementBuilder {
  root: HTMLDivElement;

  constructor() {
    super();
    const header = this.createElement('header');
    this.root = this.createElement('div', {
      id: 'root',
    });
    document.body.classList.add('min-vh-100', 'bg-dark', 'bg-gradient');
    document.body.append(header, this.root);
    document.body.dataset.bsTheme = 'dark';
  }
}
