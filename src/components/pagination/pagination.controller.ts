import { PaginationModel } from './pagination.model';
import { PaginationView } from './pagination.view';

export class PaginationController {
  model: PaginationModel;
  view: PaginationView;

  constructor(model: PaginationModel, view: PaginationView) {
    this.model = model;
    this.view = view;
  }

  // paginationPageClickHandler() {}
}
