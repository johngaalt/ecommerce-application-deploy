import { Pagination } from 'types/pagination.enum';
import { PaginationModel } from './pagination.model';
import { PaginationView } from './pagination.view';
import eventBus from 'services/event.service';
import { EventTypes } from 'types/event.enum';

export class PaginationController {
  model: PaginationModel;
  view: PaginationView;

  constructor(model: PaginationModel, view: PaginationView) {
    this.model = model;
    this.view = view;

    this.view.paginationPageClickListener(
      this.paginationPageClickHandler.bind(this),
    );
  }

  paginationPageClickHandler(text: string) {
    eventBus.publish(EventTypes.fetchAirplanes, text);
  }
}
