import { RaceService } from 'services/race.service';
import { RaceModel } from './race.model';
import { RaceView } from './race.view';
import { TrackController } from 'components/track/track.controller';
import { TrackModel } from 'components/track/track.model';
import { TrackView } from 'components/track/track.view';
import eventBus from 'services/event.service';
import { EventTypes } from 'types/event.enum';
import { PaginationController } from 'components/pagination/pagination.controller';
import { PaginationModel } from 'components/pagination/pagination.model';
import { PaginationView } from 'components/pagination/pagination.view';
import { Pagination } from 'types/pagination.enum';
import { HeadingsController } from 'components/headings/headings.controller';
import { HeadingsModel } from 'components/headings/headings.model';
import { HeadingsView } from 'components/headings/headings.view';
import { Controller } from 'interfaces/controller';
import { WinnersService } from 'services/winners.service';

export class RaceController implements Controller {
  model: RaceModel;
  view: RaceView;
  raceService: RaceService;
  paginationController: PaginationController;
  headingsController: HeadingsController;
  tracks?: TrackController[];
  winnersService: WinnersService;

  constructor(model: RaceModel, view: RaceView) {
    this.model = model;
    this.view = view;

    this.raceService = new RaceService();
    this.winnersService = new WinnersService();

    this.fetchAirplanes();

    this.headingsController = new HeadingsController(
      new HeadingsModel(),
      new HeadingsView(),
    );

    this.paginationController = new PaginationController(
      new PaginationModel(),
      new PaginationView(),
      EventTypes.fetchAirplanes,
    );

    eventBus.subscribe(
      EventTypes.fetchAirplanes,
      this.fetchAirplanes.bind(this),
    );
    eventBus.subscribe(EventTypes.startRace, this.startRace.bind(this));
    eventBus.subscribe(EventTypes.resetRace, this.resetRace.bind(this));
  }

  async fetchAirplanes(paginationText?: unknown) {
    this.rewritePage(paginationText);
    const response = await this.raceService.getAirplanes(
      this.model.currentPage,
      this.model.limit,
    );
    this.model.airplanes = response.items;
    this.model.count = response.count;

    this.view.clear();
    this.headingsController.init(
      this.model.title,
      this.model.count,
      this.model.currentPage,
      this.model.limit,
      '#race',
    );

    this.initPagination();
    this.tracks = this.model.airplanes.map(
      (airplane) =>
        new TrackController(new TrackModel(airplane), new TrackView(airplane)),
    );
    this.tracks.forEach((track) => track.init());
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

  initPagination() {
    this.paginationController.model.init(
      this.model.count,
      this.model.limit,
      this.model.currentPage,
    );
    this.paginationController.init();
  }

  async startRace() {
    if (this.tracks?.length) {
      const tracksHandlerPromises = this.tracks.map((track) =>
        track.startButtonClickHandler(),
      );

      try {
        const { id, name, time } = await Promise.any(tracksHandlerPromises);
        this.view.showWinner(name, time);
        await this.saveResult(id, time);
      } catch (error) {
        global.console.error(error);
      }
    }
  }

  private async saveResult(id: number, time: number) {
    const winner = await this.winnersService.getWinner(id);

    const data = {
      id,
      time: Math.min(time, winner?.time || Number.MAX_SAFE_INTEGER),
      wins: (winner?.wins || 0) + 1,
    };

    if (Object.keys(winner)?.length) {
      await this.winnersService.updateWinner(id, data);
    } else {
      await this.winnersService.createWinner(data);
    }
  }

  async resetRace() {
    if (this.tracks?.length) {
      // this.view.hideWinner();
      const tracksHandlerPromises = this.tracks.map((track) =>
        track.stopButtonClickHandler(),
      );
      await Promise.all(tracksHandlerPromises);
    }
  }

  init() {
    this.view.render();
  }
}