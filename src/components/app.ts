import app from './app.html';
import { HeaderController } from './header/header.controller';
import { HeaderModel } from './header/header.model';
import { HeaderView } from './header/header.view';

export class App {
  headerController: HeaderController;
  constructor() {
    document.body.innerHTML = app;
    this.headerController = new HeaderController(
      new HeaderModel(),
      new HeaderView(),
    );
  }
}
