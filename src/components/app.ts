import { View } from 'interfaces/view';
import { HeaderController } from './header/header.controller';
import { HeaderModel } from './header/header.model';
import { HeaderView } from './header/header.view';

export class App extends View {
  headerController: HeaderController;

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
  }
}
