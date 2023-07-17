import { Router } from 'services/router.service';
import { HeaderModel } from './header.model';
import { HeaderView } from './header.view';

export class HeaderController {
  model: HeaderModel;
  view: HeaderView;
  router: Router;

  constructor(model: HeaderModel, view: HeaderView, router: Router) {
    this.model = model;
    this.view = view;
    this.router = router;

    this.view.ulClickListener(this.ulClickHandler.bind(this));
  }

  ulClickHandler(path: string) {
    this.router.navigateTo(path);
  }
}
