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
  root: HTMLDivElement;

  constructor() {
    super();
    const header = this.createElement('header');
    this.root = this.createElement('div', {
      id: 'root',
    });
    document.body.classList.add('min-vh-100', 'bg-dark', 'bg-gradient');
    document.body.append(header, this.root);
    document.body.dataset.bsTheme = 'dark';

    this.router = new Router(this.root, {
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
