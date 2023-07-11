import { View } from 'interfaces/view';

export class GarageView extends View {
  constructor() {
    super();

    const main = this.createElement('main', {
      id: 'garage',
      classes: ['garage'],
    });
    const parent = this.getElement('#root');

    if (parent) {
      parent.appendChild(main);
    }
  }
}
