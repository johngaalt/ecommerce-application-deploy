import { ButtonGroupController } from 'components/button-group/button-group.controller';
import { ButtonGroupModel } from 'components/button-group/button-group.model';
import { ButtonGroupView } from 'components/button-group/button-group.view';
import { InputGroupController } from 'components/input-group/input-group.controller';
import { InputGroupModel } from 'components/input-group/input-group.model';
import { InputGroupView } from 'components/input-group/input-group.view';
import { View } from 'interfaces/view';

export class GarageView extends View {
  CONTROL_ID = 'control';
  carCreateController: InputGroupController;
  inputGroupController: InputGroupController;
  buttonGroupController: ButtonGroupController;

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

    this.carCreateController = new InputGroupController(
      new InputGroupModel(),
      new InputGroupView(),
    );

    this.inputGroupController = new InputGroupController(
      new InputGroupModel(),
      new InputGroupView(),
    );

    this.buttonGroupController = new ButtonGroupController(
      new ButtonGroupModel(),
      new ButtonGroupView(),
    );
  }

  private controlMenu() {
    const controlContainer = this.createElement('div', {
      id: this.CONTROL_ID,
      classes: ['container'],
    });

    return controlContainer;
  }
}
