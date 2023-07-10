import { View } from 'interfaces/view';

export class HeaderView extends View {
  element: HTMLElement | null = null;

  constructor() {
    super();
    const header = this.createElement('header');
    const parent = this.getElement('#root');

    if (parent) {
      parent.appendChild(header);
    }

    this.element = header;
  }
}
