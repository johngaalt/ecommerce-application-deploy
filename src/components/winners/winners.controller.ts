import { Route } from 'types/route.type';
import { WinnersModel } from './winners.model';
import { WinnersView } from './winners.view';

export class WinnersController implements Route {
  model: WinnersModel;
  view: WinnersView;
  name = 'Winners';
  pageNumber = 1;

  constructor(model: WinnersModel, view: WinnersView) {
    this.model = model;
    this.view = view;
  }

  init() {
    return;
  }
}
