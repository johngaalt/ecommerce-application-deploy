import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';
import { Airplane } from 'types/airplane.type';

export class InputGroupView extends ElementBuilder implements View {
  button: HTMLButtonElement;
  inputName: HTMLInputElement;
  inputColor: HTMLInputElement;
  inputId: HTMLInputElement;
  isCreateMode: boolean;
  inputGroup: HTMLDivElement;
  input: HTMLInputElement;
  colorPicker: HTMLInputElement;

  constructor(type: 'create' | 'update') {
    super();

    this.isCreateMode = type === 'create';
    this.inputGroup = this.createElement('div', {
      classes: ['input-group', 'mt-1'],
    });

    this.input = this.createElement<HTMLInputElement>('input', {
      classes: ['form-control', 'form-control-sm'],
    });
    this.input.placeholder = this.isCreateMode
      ? 'Type airplane name'
      : 'Select an airplane';
    this.input.type = 'text';
    this.inputName = this.input;

    this.colorPicker = this.createElement<HTMLInputElement>('input', {
      classes: ['form-control', 'form-control-color'],
    });
    this.colorPicker.type = 'color';
    this.inputColor = this.colorPicker;

    this.inputId = this.createElement<HTMLInputElement>('input');
    this.inputId.type = 'hidden';

    this.button = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-outline-light'],
    });
    this.button.type = 'button';
    this.button.textContent = this.isCreateMode ? 'Create' : 'Update';
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

  render() {
    this.inputGroup.appendChild(this.input);
    this.inputGroup.appendChild(this.colorPicker);
    this.inputGroup.appendChild(this.inputId);
    this.inputGroup.appendChild(this.button);

    const parent = this.getElement('#control');
    parent?.appendChild(this.inputGroup);
  }
}
