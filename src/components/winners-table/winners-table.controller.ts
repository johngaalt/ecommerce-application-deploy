import { Controller } from 'interfaces/controller';
import { WinnersTableModel } from './winners-table.model';
import { WinnersTableView } from './winners-table.view';
import { OrderOptions, SortOptions, WinnerAirplane } from 'types/winners.type';
import { WinnersService } from 'services/winners.service';
import eventBus from 'services/event.service';
import { EventTypes } from 'types/event.enum';

export class WinnersTableController implements Controller {
  model: WinnersTableModel;
  view: WinnersTableView;
  winnersService: WinnersService;

  constructor(model: WinnersTableModel, view: WinnersTableView) {
    this.model = model;
    this.view = view;
    this.winnersService = new WinnersService();

    this.view.tableHeaderClickListener(this.tableHeaderClickHandler.bind(this));
  }

  init(winners: WinnerAirplane[], currentPage: number, limit: number) {
    this.model.winners = winners;
    this.model.currentPage = currentPage;
    this.model.limit = limit;
    this.view.render(this.model);
  }

  async tableHeaderClickHandler(sort?: SortOptions, order?: OrderOptions) {
    eventBus.publish(EventTypes.fetchWinners, { sort, order });
  }
}
