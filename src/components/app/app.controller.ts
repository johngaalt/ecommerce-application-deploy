import { GarageController } from 'components/garage/garage.controller';
import { GarageModel } from 'components/garage/garage.model';
import { GarageView } from 'components/garage/garage.view';
import { HeaderController } from 'components/header/header.controller';
import { HeaderModel } from 'components/header/header.model';
import { HeaderView } from 'components/header/header.view';
import { WinnersController } from 'components/winners/winners.controller';
import { WinnersModel } from 'components/winners/winners.model';
import { WinnersView } from 'components/winners/winners.view';
import { Router } from 'services/router.service';
import { AppModel } from './app.model';
import { AppView } from './app.view';

export class AppController {
  model: AppModel;
  view: AppView;
  router: Router;
  headerController: HeaderController;

  constructor(model: AppModel, view: AppView) {
    this.model = model;
    this.view = view;

    this.router = new Router(this.view.root, {
      '#garage': new GarageController(new GarageModel(), new GarageView()),
      '#winners': new WinnersController(new WinnersModel(), new WinnersView()),
    });

    this.router.navigateTo('#garage');

    this.headerController = new HeaderController(
      new HeaderModel(),
      new HeaderView(),
      this.router,
    );
    this.headerController.init();
  }
}
