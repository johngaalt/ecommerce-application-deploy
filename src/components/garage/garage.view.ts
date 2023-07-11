import { View } from 'interfaces/view';

export class GarageView extends View {
  CONTROL_ID = 'control';

  constructor() {
    super();

    const main = this.createElement('main', {
      id: 'garage',
      classes: ['garage'],
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
      classes: ['container'],
    });
    const inputGroup = this.createInputGroup();
    const buttonGroup = this.createButtonGroup();
    controlContainer.append(inputGroup, buttonGroup);

    return controlContainer;
  }

  createInputGroup() {
    const inputGroup = this.createElement('div', {
      classes: ['input-group', 'mb-3'],
    });

    const input = this.createElement<HTMLInputElement>('input', {
      classes: ['form-control', 'form-control-sm'],
    });
    input.placeholder = 'TYPE CARS NAME';
    input.type = 'text';
    inputGroup.appendChild(input);

    const button1 = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-success'],
    });
    button1.type = 'button';
    button1.textContent = 'COLOR';
    inputGroup.appendChild(button1);

    const button2 = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-success'],
    });
    button2.type = 'button';
    button2.textContent = 'CREATE';
    inputGroup.appendChild(button2);

    return inputGroup;
  }

  createButtonGroup() {
    const buttonGroup = this.createElement('div', {
      classes: ['btn-group'],
    });

    const button1 = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-success', 'me-2'],
    });
    button1.textContent = 'RACE';
    button1.type = 'button';
    buttonGroup.appendChild(button1);

    const button2 = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-success', 'me-2'],
    });
    button2.textContent = 'RESET';
    button2.type = 'button';

    buttonGroup.appendChild(button2);

    const button3 = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-success'],
    });
    button3.textContent = 'GENERATE CARS';
    button3.type = 'button';

    buttonGroup.appendChild(button3);

    return buttonGroup;
  }
}
