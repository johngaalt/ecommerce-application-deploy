import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';

export class WinnersView extends ElementBuilder implements View {
  WINNERS_ID = 'winners';
  main: HTMLElement;

  constructor() {
    super();
    this.main = this.createElement('main', {
      id: this.WINNERS_ID,
      classes: ['container'],
    });
  }

  render() {
    const parent = this.getElement('#root');

    if (parent) {
      parent.appendChild(this.main);
    }
  }
}
