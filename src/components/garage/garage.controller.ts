import { GarageModel } from './garage.model';
import { GarageView } from './garage.view';
import { Route } from 'types/route.type';

export class GarageController implements Route {
  model: GarageModel;
  view: GarageView;

  name = 'Garage';
  pageNumber = 1;

  constructor(model: GarageModel, view: GarageView) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.init();
  }
}
