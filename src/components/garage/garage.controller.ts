import { ButtonGroupController } from 'components/button-group/button-group.controller';
import { ButtonGroupModel } from 'components/button-group/button-group.model';
import { ButtonGroupView } from 'components/button-group/button-group.view';
import { InputGroupController } from 'components/input-group/input-group.controller';
import { InputGroupModel } from 'components/input-group/input-group.model';
import { InputGroupView } from 'components/input-group/input-group.view';
import { RaceController } from 'components/race/race.controller';
import { RaceModel } from 'components/race/race.model';
import { RaceView } from 'components/race/race.view';
import { GarageModel } from './garage.model';
import { GarageView } from './garage.view';
import { Controller } from 'interfaces/controller';

export class GarageController implements Controller {
  model: GarageModel;
  view: GarageView;
  airplaneCreateController!: InputGroupController;
  airplaneUpdateController!: InputGroupController;
  buttonGroupController!: ButtonGroupController;
  raceController!: RaceController;

  name = 'Garage';
  pageNumber = 1;

  constructor(model: GarageModel, view: GarageView) {
    this.model = model;
    this.view = view;

    this.airplaneCreateController = new InputGroupController(
      new InputGroupModel('create'),
      new InputGroupView('create'),
    );

    this.airplaneUpdateController = new InputGroupController(
      new InputGroupModel('update'),
      new InputGroupView('update'),
    );

    this.buttonGroupController = new ButtonGroupController(
      new ButtonGroupModel(),
      new ButtonGroupView(),
    );

    this.raceController = new RaceController(new RaceModel(), new RaceView());
  }

  init() {
    this.view.render();
    this.airplaneCreateController.init();
    this.airplaneUpdateController.init();
  }
}
