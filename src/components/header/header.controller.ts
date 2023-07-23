import { Router } from 'services/router.service';
import { HeaderModel } from './header.model';
import { HeaderView } from './header.view';
import eventBus from 'services/event.service';
import { EventTypes } from 'types/event.enum';
import { Controller } from 'interfaces/controller';

export class HeaderController implements Controller {
  model: HeaderModel;
  view: HeaderView;
  router: Router;

  constructor(model: HeaderModel, view: HeaderView, router: Router) {
    this.model = model;
    this.view = view;
    this.router = router;

    eventBus.subscribe(EventTypes.urlChanged, this.urlChanged.bind(this));
  }

  urlChanged() {
    this.view.setActiveLink();
  }

  init() {
    this.view.render();
  }
}
