import { WinnersModel } from './winners.model';
import { WinnersView } from './winners.view';
import { HeadingsController } from 'components/headings/headings.controller';
import { HeadingsModel } from 'components/headings/headings.model';
import { HeadingsView } from 'components/headings/headings.view';
import { PaginationController } from 'components/pagination/pagination.controller';
import { PaginationModel } from 'components/pagination/pagination.model';
import { PaginationView } from 'components/pagination/pagination.view';
import { WinnersTableController } from 'components/winners-table/winners-table.controller';
import { WinnersTableModel } from 'components/winners-table/winners-table.model';
import { WinnersTableView } from 'components/winners-table/winners-table.view';
import { Controller } from 'interfaces/controller';
import eventBus from 'services/event.service';
import { RaceService } from 'services/race.service';
import { WinnersService } from 'services/winners.service';
import { EventTypes } from 'types/event.enum';
import { Pagination } from 'types/pagination.enum';

export class WinnersController implements Controller {
  model: WinnersModel;
  view: WinnersView;
  name = 'Winners';
  pageNumber = 1;
  headingsController: HeadingsController;
  winnersTable: WinnersTableController;
  winnersService: WinnersService;
  raceService: RaceService;
  paginationController: PaginationController;

  constructor(model: WinnersModel, view: WinnersView) {
    this.model = model;
    this.view = view;
    this.winnersService = new WinnersService();
    this.raceService = new RaceService();

    this.headingsController = new HeadingsController(
      new HeadingsModel(),
      new HeadingsView(),
    );

    this.paginationController = new PaginationController(
      new PaginationModel(),
      new PaginationView(),
      EventTypes.fetchWinners,
    );

    this.winnersTable = new WinnersTableController(
      new WinnersTableModel(),
      new WinnersTableView(),
    );

    eventBus.subscribe(EventTypes.urlChanged, this.triggerFetch.bind(this));
    eventBus.subscribe(EventTypes.fetchWinners, this.initPageData.bind(this));
  }

  init() {
    this.view.render();
  }

  triggerFetch(url: unknown) {
    if (typeof url === 'string' && url.includes('winners')) {
      eventBus.publish(EventTypes.fetchWinners);
    }
  }

  async initPageData(paginationText?: unknown) {
    this.rewritePage(paginationText);
    await this.fetchWinnerAirplanes();

    this.headingsController.init(
      this.model.title,
      this.model.count,
      this.model.currentPage,
      this.model.limit,
      '#winners',
    );
    this.initPagination();
    this.winnersTable.init(
      this.model.winners,
      this.model.currentPage,
      this.model.limit,
    );
  }

  async fetchWinnerAirplanes(): Promise<void> {
    this.model.winners = [];
    const { items, count } = await this.winnersService.getWinners({
      page: this.model.currentPage,
      limit: this.model.limit,
    });
    this.model.count = count;

    const airplaneIds = items.map((winner) => winner.id);
    const airplanePromises = airplaneIds.map((id) =>
      this.raceService.getAirplane(id),
    );
    const airplanes = await Promise.all(airplanePromises);
    for (const airplane of airplanes) {
      const winner = items.find((it) => it.id === airplane.id);

      if (winner) {
        this.model.winners.push({
          id: airplane.id,
          name: airplane.name,
          color: airplane.color,
          time: winner.time,
          wins: winner.wins,
        });
      }
    }
  }

  initPagination() {
    this.paginationController.model.init(
      this.model.count,
      this.model.limit,
      this.model.currentPage,
    );
    this.paginationController.init();
  }

  rewritePage(paginationText: unknown) {
    if (typeof paginationText === 'string') {
      if (paginationText === Pagination.Previous) {
        this.model.currentPage = this.model.currentPage - 1;
      }

      if (paginationText === Pagination.Next) {
        this.model.currentPage = this.model.currentPage + 1;
      }
    }
  }
}
