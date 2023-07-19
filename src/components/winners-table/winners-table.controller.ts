import { Controller } from 'interfaces/controller';
import { WinnersTableModel } from './winners-table.model';
import { WinnersTableView } from './winners-table.view';

export class WinnersTableController implements Controller {
  model: WinnersTableModel;
  view: WinnersTableView;

  constructor(model: WinnersTableModel, view: WinnersTableView) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.render();
  }
}
