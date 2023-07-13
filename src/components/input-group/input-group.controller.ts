import { RaceService } from 'services/race.service';
import { InputGroupModel } from './input-group.model';
import { InputGroupView } from './input-group.view';
import eventBus from 'services/event.service';
import { EventTypes } from 'types/event.enum';

export class InputGroupController {
  model: InputGroupModel;
  view: InputGroupView;
  raceService: RaceService;

  constructor(model: InputGroupModel, view: InputGroupView) {
    this.model = model;
    this.view = view;
    this.raceService = new RaceService();

    this.view.buttonClickListener(this.buttonClickHandler.bind(this));
  }

  async buttonClickHandler(name: string, color: string) {
    if (name) {
      await this.raceService.createAirplane({
        name,
        color,
      });
      eventBus.publish(EventTypes.fetchAirplanes);
    } else {
      alert('Please type an airplane name');
    }
  }
}
