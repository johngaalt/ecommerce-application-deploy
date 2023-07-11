import { View } from 'interfaces/view';

export class ButtonGroupView extends View {
  constructor() {
    super();

    const buttonGroup = this.createElement('div', {
      classes: ['mt-1'],
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

    const parent = this.getElement('#control');
    parent?.appendChild(buttonGroup);
  }
}
