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
    );

    this.winnersTable = new WinnersTableController(
      new WinnersTableModel(),
      new WinnersTableView(),
    );

    eventBus.subscribe(EventTypes.urlChanged, this.fetchWinners.bind(this));
  }

  init() {
    this.view.render();
  }

  async fetchWinners(data: unknown) {
    if (typeof data === 'string' && data.includes('winners')) {
      await this.getWinners();

      this.headingsController.init(
        this.model.title,
        this.model.count,
        this.model.currentPage,
        this.model.limit,
        '#winners',
      );
      this.winnersTable.init(this.model.winners);
      this.initPagination();
    }
  }

  async getWinners(): Promise<void> {
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
}
