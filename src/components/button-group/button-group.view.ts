import { View } from 'interfaces/view';

export class ButtonGroupView extends View {
  constructor() {
    super();

    const buttonGroup = this.createElement('div', {
      classes: ['mt-1'],
    });

    const button1 = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-secondary', 'me-2'],
    });
    button1.textContent = 'Race';
    button1.type = 'button';
    buttonGroup.appendChild(button1);

    const button2 = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-secondary', 'me-2'],
    });
    button2.textContent = 'Reset';
    button2.type = 'button';

    buttonGroup.appendChild(button2);

    const button3 = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-secondary'],
    });
    button3.textContent = 'Generate airplanes';
    button3.type = 'button';

    buttonGroup.appendChild(button3);

    const parent = this.getElement('#control');
    parent?.appendChild(buttonGroup);
  }
}
