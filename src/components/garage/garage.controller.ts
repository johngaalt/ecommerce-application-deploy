import { GarageModel } from './garage.model';
import { GarageView } from './garage.view';

export class GarageController {
  model: GarageModel;
  view: GarageView;

  constructor(model: GarageModel, view: GarageView) {
    this.model = model;
    this.view = view;
  }
}
