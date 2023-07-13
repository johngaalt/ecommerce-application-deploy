import { RaceService } from 'services/race.service';
import { RaceModel } from './race.model';
import { RaceView } from './race.view';
import { TrackController } from 'components/track/track.controller';
import { TrackModel } from 'components/track/track.model';
import { TrackView } from 'components/track/track.view';

export class RaceController {
  model: RaceModel;
  view: RaceView;
  raceService: RaceService;
  trackControllers: TrackController[];

  constructor(model: RaceModel, view: RaceView) {
    this.model = model;
    this.view = view;
    this.trackControllers = [];

    this.raceService = new RaceService();
    this.fetchAirplanes();
  }

  async fetchAirplanes() {
    const airplanes = await this.raceService.getAirplanes();
    airplanes.map(
      (airplane) =>
        new TrackController(
          new TrackModel(),
          new TrackView(airplane.name, airplane.id),
        ),
    );
  }
}
