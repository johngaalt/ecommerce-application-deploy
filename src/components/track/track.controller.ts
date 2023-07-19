import eventBus from 'services/event.service';
import { TrackModel } from './track.model';
import { TrackView } from './track.view';
import { EventTypes } from 'types/event.enum';
import { RaceService } from 'services/race.service';
import { Controller } from 'interfaces/controller';

export class TrackController implements Controller {
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

    this.view.startButtonClickListener(this.startButtonClickHandler.bind(this));
    this.view.stopButtonClickListener(this.stopButtonClickHandler.bind(this));
  }

  selectButtonClickHandler() {
    eventBus.publish(EventTypes.selectAirplane, this.model);
  }

  async removeButtonClickHandler() {
    await this.raceService.removeAirplane(this.model.id);
    eventBus.publish(EventTypes.fetchAirplanes);
  }

  async startButtonClickHandler() {
    this.view.disableStartButton();
    const { velocity, distance } = await this.raceService.startAirplane(
      this.model.id,
    );
    this.model.time = parseFloat((distance / velocity / 1000).toFixed(2));
    const timeInSeconds = `${this.model.time}s`;
    this.view.hideStartSpinner();
    this.view.startAnimation(timeInSeconds);

    try {
      const { success } = await this.raceService.driveAirplane(this.model.id);
      this.model.isFinished = success;
      return this.model;
    } catch (error) {
      this.view.stopAnimation();
      throw error;
    }
  }

  async stopButtonClickHandler() {
    this.view.showStopSpinner();
    await this.raceService.stopAirplane(this.model.id);
    this.view.stopAirplane();
  }

  init() {
    this.view.render();
  }
}
