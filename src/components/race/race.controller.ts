import { RaceModel } from './race.model';
import { RaceView } from './race.view';

export class RaceController {
  model: RaceModel;
  view: RaceView;

  constructor(model: RaceModel, view: RaceView) {
    this.model = model;
    this.view = view;
  }
}
