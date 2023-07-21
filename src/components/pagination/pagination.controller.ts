import { Controller } from 'interfaces/controller';
import { PaginationModel } from './pagination.model';
import { PaginationView } from './pagination.view';
import eventBus from 'services/event.service';
import { EventTypes } from 'types/event.enum';

export class PaginationController implements Controller {
  model: PaginationModel;
  view: PaginationView;
  fetchEvent: EventTypes;

  constructor(
    model: PaginationModel,
    view: PaginationView,
    fetchEvent: EventTypes,
  ) {
    this.model = model;
    this.view = view;
    this.fetchEvent = fetchEvent;
  }

  paginationPageClickHandler(text: string) {
    eventBus.publish(this.fetchEvent, text);
  }

  init() {
    this.view.render(this.model.pageCount, this.model.currentPage);
    this.view.paginationPageClickListener(
      this.paginationPageClickHandler.bind(this),
    );
  }
}
