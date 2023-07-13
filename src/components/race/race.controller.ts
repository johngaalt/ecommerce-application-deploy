import { RaceService } from 'services/race.service';
import { RaceModel } from './race.model';
import { RaceView } from './race.view';
import { TrackController } from 'components/track/track.controller';
import { TrackModel } from 'components/track/track.model';
import { TrackView } from 'components/track/track.view';
import eventBus from 'services/event.service';
import { EventTypes } from 'types/event.enum';

export class RaceController {
  model: RaceModel;
  view: RaceView;
  raceService: RaceService;

  constructor(model: RaceModel, view: RaceView) {
    this.model = model;
    this.view = view;

    this.raceService = new RaceService();
    this.fetchAirplanes();
    eventBus.subscribe(
      EventTypes.fetchAirplanes,
      this.fetchAirplanes.bind(this),
    );
  }

  async fetchAirplanes() {
    const response = await this.raceService.getAirplanes();
    this.model.airplanes = response.items;
    this.model.count = response.count;

    this.view.clear();
    this.view.renderHeadings(this.model.count, 1);

    this.model.airplanes.map(
      (airplane) =>
        new TrackController(new TrackModel(airplane), new TrackView(airplane)),
    );
  }
}
