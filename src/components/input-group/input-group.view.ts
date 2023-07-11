import { View } from 'interfaces/view';

export class InputGroupView extends View {
  constructor(type: 'create' | 'update') {
    super();

    const inputGroup = this.createElement('div', {
      classes: ['input-group', 'mt-1'],
    });

    const input = this.createElement<HTMLInputElement>('input', {
      classes: ['form-control', 'form-control-sm'],
    });
    input.placeholder = 'TYPE CARS NAME';
    input.type = 'text';
    inputGroup.appendChild(input);

    const colorPicker = this.createElement<HTMLInputElement>('input', {
      classes: ['form-control', 'form-control-color'],
    });
    colorPicker.type = 'color';
    inputGroup.appendChild(colorPicker);

    const button = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-success'],
    });
    button.type = 'button';
    button.textContent = type === 'create' ? 'CREATE' : 'UPDATE';
    inputGroup.appendChild(button);

    const parent = this.getElement('#control');
    parent?.appendChild(inputGroup);
  }
}
