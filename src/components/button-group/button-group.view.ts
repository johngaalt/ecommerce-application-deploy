import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';

export class ButtonGroupView extends ElementBuilder implements View {
  raceBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  generateBtn: HTMLButtonElement;
  buttonGroup: HTMLDivElement;

  constructor() {
    super();

    this.buttonGroup = this.createElement('div', {
      classes: ['mt-1'],
    });

    this.raceBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-primary', 'me-2'],
    });
    this.raceBtn.textContent = 'Race';
    this.raceBtn.type = 'button';

    this.resetBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-outline-light', 'me-2'],
    });
    this.resetBtn.textContent = 'Reset';
    this.resetBtn.type = 'button';

    this.generateBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-outline-light'],
    });
    this.generateBtn.textContent = 'Generate airplanes';
    this.generateBtn.type = 'button';
  }

  generateButtonClickListener(cb: () => void) {
    this.generateBtn.addEventListener('click', () => cb());
  }

  raceButtonClickListener(cb: () => void) {
    this.raceBtn.addEventListener('click', () => cb());
  }

  resetButtonClickListener(cb: () => void) {
    this.resetBtn.addEventListener('click', () => cb());
  }

  render() {
    this.buttonGroup.appendChild(this.raceBtn);
    this.buttonGroup.appendChild(this.resetBtn);
    this.buttonGroup.appendChild(this.generateBtn);

    const parent = this.getElement('#control');
    parent?.appendChild(this.buttonGroup);
  }
}
