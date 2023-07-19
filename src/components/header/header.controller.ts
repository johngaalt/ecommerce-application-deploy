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

    this.view.ulClickListener(this.ulClickHandler.bind(this));
    eventBus.subscribe(EventTypes.urlChanged, this.urlChanged.bind(this));
  }

  ulClickHandler(path: string) {
    this.router.navigateTo(path);
  }

  urlChanged(data: unknown) {
    if (typeof data === 'string') {
      this.view.setActiveLink(data);
    }
  }
}
