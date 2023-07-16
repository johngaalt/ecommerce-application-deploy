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

export class RaceController {
  model: RaceModel;
  view: RaceView;
  raceService: RaceService;
  paginationController: PaginationController;
  tracks?: TrackController[];

  constructor(model: RaceModel, view: RaceView) {
    this.model = model;
    this.view = view;

    this.raceService = new RaceService();
    this.paginationController = new PaginationController(
      new PaginationModel(),
      new PaginationView(),
    );

    this.fetchAirplanes();

    eventBus.subscribe(
      EventTypes.fetchAirplanes,
      this.fetchAirplanes.bind(this),
    );
    eventBus.subscribe(EventTypes.startRace, this.startRace.bind(this));
  }

  async fetchAirplanes(data?: unknown) {
    this.rewritePage(data);
    const response = await this.raceService.getAirplanes(
      this.model.currentPage,
      this.model.limit,
    );
    this.model.airplanes = response.items;
    this.model.count = response.count;

    this.view.clear();
    this.view.renderHeadings(
      this.model.count,
      this.model.currentPage,
      this.model.limit,
    );

    this.initPagination();
    this.tracks = this.model.airplanes.map(
      (airplane) =>
        new TrackController(new TrackModel(airplane), new TrackView(airplane)),
    );
  }

  rewritePage(data: unknown) {
    if (typeof data === 'string') {
      if (data === Pagination.Previous) {
        this.model.currentPage = this.model.currentPage - 1;
      }

      if (data === Pagination.Next) {
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
    this.paginationController.initView();
  }

  async startRace() {
    if (this.tracks?.length) {
      const tracksHandlerPromises = this.tracks.map((track) =>
        track.startButtonClickHandler(),
      );
      await Promise.race(tracksHandlerPromises);

      const winnerTrack = this.tracks
        .map((track) => track.model)
        .filter((model) => model.isFinished)
        .map((model) => ({ time: model.time, name: model.name }))
        .reduce((acc, curr) => (curr.time < acc.time ? curr : acc), {
          time: Infinity,
          name: '',
        });

      this.view.showWinner(winnerTrack.name, winnerTrack.time);
    }
  }
}
