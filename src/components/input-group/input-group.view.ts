import { View } from 'interfaces/view';

export class InputGroupView extends View {
  button: HTMLButtonElement;
  inputName: HTMLInputElement;
  inputColor: HTMLInputElement;

  constructor(type: 'create' | 'update') {
    super();

    const isCreateMode = type === 'create';
    const inputGroup = this.createElement('div', {
      classes: ['input-group', 'mt-1'],
    });

    const input = this.createElement<HTMLInputElement>('input', {
      classes: ['form-control', 'form-control-sm'],
    });
    input.placeholder = isCreateMode
      ? 'Type airplane name'
      : 'Select an airplane';
    input.type = 'text';
    this.inputName = input;
    inputGroup.appendChild(input);

    const colorPicker = this.createElement<HTMLInputElement>('input', {
      classes: ['form-control', 'form-control-color'],
    });
    colorPicker.type = 'color';
    this.inputColor = colorPicker;
    inputGroup.appendChild(colorPicker);

    const button = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-secondary'],
    });
    button.type = 'button';
    button.textContent = isCreateMode ? 'Create' : 'Update';
    this.button = button;
    inputGroup.appendChild(button);

    const parent = this.getElement('#control');
    parent?.appendChild(inputGroup);
  }

  buttonClickListener(cb: (name: string, color: string) => void) {
    this.button.addEventListener('click', this.getData.bind(this, cb));
  }

  getData(cb: (name: string, color: string) => void) {
    const name = this.inputName.value;
    const color = this.inputColor.value;
    cb(name, color);
  }
}
