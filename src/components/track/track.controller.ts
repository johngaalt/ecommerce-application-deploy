import eventBus from 'services/event.service';
import { TrackModel } from './track.model';
import { TrackView } from './track.view';
import { EventTypes } from 'types/event.enum';
import { RaceService } from 'services/race.service';

export class TrackController {
  model: TrackModel;
  view: TrackView;
  raceService: RaceService;

  constructor(model: TrackModel, view: TrackView) {
    this.model = model;
    this.view = view;
    this.raceService = new RaceService();

    this.view.selectButtonClickListener(
      this.selectButtonClickHandler.bind(this),
    );

    this.view.removeButtonClickListener(
      this.removeButtonClickHandler.bind(this),
    );
  }

  selectButtonClickHandler() {
    eventBus.publish(EventTypes.selectAirplane, this.model);
  }

  async removeButtonClickHandler() {
    await this.raceService.removeAirplane(this.model.id);
    eventBus.publish(EventTypes.fetchAirplanes);
  }
}
