import { ButtonGroupController } from 'components/button-group/button-group.controller';
import { ButtonGroupModel } from 'components/button-group/button-group.model';
import { ButtonGroupView } from 'components/button-group/button-group.view';
import { InputGroupController } from 'components/input-group/input-group.controller';
import { InputGroupModel } from 'components/input-group/input-group.model';
import { InputGroupView } from 'components/input-group/input-group.view';
import { RaceController } from 'components/race/race.controller';
import { RaceModel } from 'components/race/race.model';
import { RaceView } from 'components/race/race.view';
import { View } from 'interfaces/view';

export class GarageView extends View {
  CONTROL_ID = 'control';
  carCreateController!: InputGroupController;
  carUpdateController!: InputGroupController;
  buttonGroupController!: ButtonGroupController;
  raceController!: RaceController;

  init() {
    const main = this.createElement('main', {
      id: 'garage',
      classes: ['container'],
    });
    const parent = this.getElement('#root');
    const controlContainer = this.controlMenu();
    main.appendChild(controlContainer);

    if (parent) {
      parent.appendChild(main);
    }

    this.carCreateController = new InputGroupController(
      new InputGroupModel('create'),
      new InputGroupView('create'),
    );

    this.carUpdateController = new InputGroupController(
      new InputGroupModel('update'),
      new InputGroupView('update'),
    );

    this.buttonGroupController = new ButtonGroupController(
      new ButtonGroupModel(),
      new ButtonGroupView(),
    );

    this.raceController = new RaceController(new RaceModel(), new RaceView());
  }

  private controlMenu() {
    const controlContainer = this.createElement('div', {
      id: this.CONTROL_ID,
      classes: ['w-50', 'mt-3'],
    });

    return controlContainer;
  }
}
