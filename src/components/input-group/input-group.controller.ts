import { RaceService } from 'services/race.service';
import { InputGroupModel } from './input-group.model';
import { InputGroupView } from './input-group.view';

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

  buttonClickHandler(name: string, color: string) {
    if (name) {
      this.raceService.createAirplane({
        name,
        color,
      });
    } else {
      alert('Please type an airplane name');
    }
  }
}
