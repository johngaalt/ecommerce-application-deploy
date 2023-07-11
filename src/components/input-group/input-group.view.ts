import { View } from 'interfaces/view';

export class InputGroupView extends View {
  constructor() {
    super();

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

    const parent = this.getElement('#control');
    parent?.appendChild(inputGroup);
  }
}
