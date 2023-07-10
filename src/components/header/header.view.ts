import header from './header.html';

export class HeaderView {
  element: HTMLElement | null = null;

  constructor() {
    const markup = header;
    const parent = document.getElementById('root');
    if (parent) {
      parent.innerHTML = markup;
    }
  }
}
