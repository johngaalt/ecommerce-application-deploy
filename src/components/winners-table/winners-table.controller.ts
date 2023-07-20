import { Controller } from 'interfaces/controller';
import { WinnersTableModel } from './winners-table.model';
import { WinnersTableView } from './winners-table.view';
import { WinnerAirplane } from 'types/winners.type';

export class WinnersTableController implements Controller {
  model: WinnersTableModel;
  view: WinnersTableView;

  constructor(model: WinnersTableModel, view: WinnersTableView) {
    this.model = model;
    this.view = view;
  }

  init(winners: WinnerAirplane[]) {
    this.model.winners = winners;
    this.view.render(this.model.winners);
  }
}
