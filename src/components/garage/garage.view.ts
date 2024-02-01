import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';

export class GarageView extends ElementBuilder implements View {
  CONTROL_ID = 'control';
  main: HTMLElement;
  controlContainer: HTMLDivElement;

  constructor() {
    super();

    this.main = this.createElement('main', {
      id: 'garage',
      classes: ['container'],
    });

    this.controlContainer = this.createElement('div', {
      id: this.CONTROL_ID,
      classes: ['w-50', 'mt-3'],
    });
  }

  render() {
    const parent = this.getElement('#root');
    this.main.appendChild(this.controlContainer);

    if (parent) {
      parent.appendChild(this.main);
    }
  }
}
