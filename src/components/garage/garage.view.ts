import { InputGroupController } from 'components/input-group/input-group.controller';
import { InputGroupModel } from 'components/input-group/input-group.model';
import { InputGroupView } from 'components/input-group/input-group.view';
import { View } from 'interfaces/view';

export class GarageView extends View {
  CONTROL_ID = 'control';
  inputGroupController: InputGroupController;

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

    this.inputGroupController = new InputGroupController(
      new InputGroupModel(),
      new InputGroupView(),
    );
  }

  private controlMenu() {
    const controlContainer = this.createElement('div', {
      id: this.CONTROL_ID,
      classes: ['container'],
    });
    // const inputGroup = this.createInputGrou();
    // const buttonGroup = this.createButtonGroup();
    // controlContainer.append(inputGroup, buttonGroup);

    return controlContainer;
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
