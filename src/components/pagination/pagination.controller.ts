import { Controller } from 'interfaces/controller';
import { PaginationModel } from './pagination.model';
import { PaginationView } from './pagination.view';
import eventBus from 'services/event.service';
import { EventTypes } from 'types/event.enum';

export class PaginationController implements Controller {
  model: PaginationModel;
  view: PaginationView;

  constructor(model: PaginationModel, view: PaginationView) {
    this.model = model;
    this.view = view;
  }

  paginationPageClickHandler(text: string) {
    eventBus.publish(EventTypes.fetchAirplanes, text);
  }

  initView() {
    this.view.render(this.model.pageCount, this.model.currentPage);
    this.view.paginationPageClickListener(
      this.paginationPageClickHandler.bind(this),
    );
  }
}
