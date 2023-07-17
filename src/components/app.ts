import { View } from 'interfaces/view';
import { HeaderController } from './header/header.controller';
import { HeaderModel } from './header/header.model';
import { HeaderView } from './header/header.view';
import { GarageController } from './garage/garage.controller';
import { GarageView } from './garage/garage.view';
import { GarageModel } from './garage/garage.model';
import { Router } from 'services/router.service';

export class App extends View {
  headerController: HeaderController;
  router: Router;

  constructor() {
    super();
    const root = this.createElement('div', {
      id: 'root',
      classes: ['vh-100', 'bg-dark', 'bg-gradient'],
    });
    document.body.appendChild(root);
    document.body.dataset.bsTheme = 'dark';

    this.router = new Router({
      '/': new GarageController(new GarageModel(), new GarageView()),
      '/winners': new GarageController(new GarageModel(), new GarageView()),
    });

    this.router.navigateTo('/');

    this.headerController = new HeaderController(
      new HeaderModel(),
      new HeaderView(),
      this.router,
    );
  }
}
