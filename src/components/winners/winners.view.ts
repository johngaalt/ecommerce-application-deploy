import { View } from 'interfaces/view';

export class WinnersView extends View {
  WINNERS_ID = 'winners';

  init() {
    const main = this.createElement('main', {
      id: this.WINNERS_ID,
      classes: ['container'],
    });
    const parent = this.getElement('#root');

    if (parent) {
      parent.appendChild(main);
    }
  }
}
