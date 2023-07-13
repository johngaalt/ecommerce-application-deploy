import { View } from 'interfaces/view';

export class ButtonGroupView extends View {
  raceBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  generateBtn: HTMLButtonElement;

  constructor() {
    super();

    const buttonGroup = this.createElement('div', {
      classes: ['mt-1'],
    });

    this.raceBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-secondary', 'me-2'],
    });
    this.raceBtn.textContent = 'Race';
    this.raceBtn.type = 'button';
    buttonGroup.appendChild(this.raceBtn);

    this.resetBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-secondary', 'me-2'],
    });
    this.resetBtn.textContent = 'Reset';
    this.resetBtn.type = 'button';

    buttonGroup.appendChild(this.resetBtn);

    this.generateBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-secondary'],
    });
    this.generateBtn.textContent = 'Generate airplanes';
    this.generateBtn.type = 'button';

    buttonGroup.appendChild(this.generateBtn);

    const parent = this.getElement('#control');
    parent?.appendChild(buttonGroup);
  }

  generateButtonClickListener(cb: () => void) {
    this.generateBtn.addEventListener('click', () => cb());
  }
}
