import { RaceService } from 'services/race.service';
import { ButtonGroupModel } from './button-group.model';
import { ButtonGroupView } from './button-group.view';
import { MODELS, SERIES } from 'constants/models';
import eventBus from 'services/event.service';
import { EventTypes } from 'types/event.enum';
import { Controller } from 'interfaces/controller';

export class ButtonGroupController implements Controller {
  model: ButtonGroupModel;
  view: ButtonGroupView;
  raceService: RaceService;

  constructor(model: ButtonGroupModel, view: ButtonGroupView) {
    this.model = model;
    this.view = view;
    this.raceService = new RaceService();

    this.view.generateButtonClickListener(
      this.generateButtonClickHandler.bind(this),
    );

    this.view.raceButtonClickListener(this.raceButtonClickHandler.bind(this));
    this.view.resetButtonClickListener(this.resetButtonClickHandler.bind(this));
  }

  async generateButtonClickHandler() {
    const airplanesPromises = Array.from({ length: 100 }, () => ({
      name: this.generateRandomAirplane(),
      color: this.generateRandomHexColor(),
    })).map(async (element) => await this.raceService.createAirplane(element));

    await Promise.all(airplanesPromises);
    eventBus.publish(EventTypes.fetchAirplanes);
  }

  raceButtonClickHandler() {
    eventBus.publish(EventTypes.startRace);
  }

  resetButtonClickHandler() {
    eventBus.publish(EventTypes.resetRace);
  }

  generateRandomAirplane() {
    const airplaneModel = MODELS[Math.floor(Math.random() * MODELS.length)];
    const airplaneSeries = SERIES[Math.floor(Math.random() * SERIES.length)];
    return `${airplaneModel} ${airplaneSeries}`;
  }

  generateRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    const HEX_COLOR_LENGTH = 6;
    for (let i = 0; i < HEX_COLOR_LENGTH; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
}
