import { View } from 'interfaces/view';
import { Airplane } from 'types/airplane.type';

export class InputGroupView extends View {
  button: HTMLButtonElement;
  inputName: HTMLInputElement;
  inputColor: HTMLInputElement;
  inputId: HTMLInputElement;
  isCreateMode: boolean;

  constructor(type: 'create' | 'update') {
    super();

    this.isCreateMode = type === 'create';
    const inputGroup = this.createElement('div', {
      classes: ['input-group', 'mt-1'],
    });

    const input = this.createElement<HTMLInputElement>('input', {
      classes: ['form-control', 'form-control-sm'],
    });
    input.placeholder = this.isCreateMode
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

    this.inputId = this.createElement<HTMLInputElement>('input');
    this.inputId.type = 'hidden';
    inputGroup.appendChild(this.inputId);

    const button = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-secondary'],
    });
    button.type = 'button';
    button.textContent = this.isCreateMode ? 'Create' : 'Update';
    this.button = button;
    inputGroup.appendChild(button);

    const parent = this.getElement('#control');
    parent?.appendChild(inputGroup);
  }

  buttonClickListener(cb: (name: string, color: string, id?: number) => void) {
    this.button.addEventListener('click', this.getData.bind(this, cb));
  }

  getData(cb: (name: string, color: string, id?: number) => void) {
    const name = this.inputName.value;
    const color = this.inputColor.value;
    const id = this.inputId.value;
    cb(name, color, Number(id));
  }

  setData(airplane: Airplane) {
    if (!this.isCreateMode) {
      this.inputName.value = airplane.name;
      this.inputColor.value = airplane.color;
      this.inputId.value = String(airplane.id);
    }
  }
}
