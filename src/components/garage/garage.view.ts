import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';

export class GarageView extends ElementBuilder implements View {
  CONTROL_ID = 'control';

  constructor() {
    super();

    const main = this.createElement('main', {
      id: 'garage',
      classes: ['container'],
    });
    const parent = this.getElement('#root');
    const controlContainer = this.controlMenu();
    main.appendChild(controlContainer);

    if (parent) {
      parent.appendChild(main);
    }
  }

  private controlMenu() {
    const controlContainer = this.createElement('div', {
      id: this.CONTROL_ID,
      classes: ['w-50', 'mt-3'],
    });

    return controlContainer;
  }
}
