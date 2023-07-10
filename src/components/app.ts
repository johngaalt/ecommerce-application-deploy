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
    });
    document.body.appendChild(root);

    this.headerController = new HeaderController(
      new HeaderModel(),
      new HeaderView(),
    );
  }
}
