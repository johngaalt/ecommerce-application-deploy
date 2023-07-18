import { Route } from 'types/route.type';
import { WinnersModel } from './winners.model';
import { WinnersView } from './winners.view';
import { HeadingsController } from 'components/headings/headings.controller';
import { HeadingsModel } from 'components/headings/headings.model';
import { HeadingsView } from 'components/headings/headings.view';

export class WinnersController implements Route {
  model: WinnersModel;
  view: WinnersView;
  name = 'Winners';
  pageNumber = 1;
  headingsController: HeadingsController;

  constructor(model: WinnersModel, view: WinnersView) {
    this.model = model;
    this.view = view;

    this.headingsController = new HeadingsController(
      new HeadingsModel(),
      new HeadingsView(),
    );
  }

  init() {
    this.view.init();
    this.headingsController.view.renderHeadings(
      'Winners',
      10,
      1,
      7,
      '#winners',
    );
  }
}
