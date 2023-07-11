import { View } from 'interfaces/view';
import { HeaderController } from './header/header.controller';
import { HeaderModel } from './header/header.model';
import { HeaderView } from './header/header.view';
import { GarageController } from './garage/garage.controller';
import { GarageView } from './garage/garage.view';
import { GarageModel } from './garage/garage.model';

export class App extends View {
  headerController: HeaderController;
  garageController: GarageController;

  constructor() {
    super();
    const root = this.createElement('div', {
      id: 'root',
      classes: ['vh-100', 'bg-dark', 'bg-gradient'],
    });
    document.body.appendChild(root);
    document.body.dataset.bsTheme = 'dark';

    this.headerController = new HeaderController(
      new HeaderModel(),
      new HeaderView(),
    );

    this.garageController = new GarageController(
      new GarageModel(),
      new GarageView(),
    );

    // Create GarageView, GarageModel, GarageController in components/garage/*.view,*.model,*.controller.ts
  }
}
