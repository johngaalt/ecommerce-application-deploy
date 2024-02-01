import { RaceService } from 'services/race.service';
import { InputGroupModel } from './input-group.model';
import { InputGroupView } from './input-group.view';
import eventBus from 'services/event.service';
import { EventTypes } from 'types/event.enum';
import { Airplane } from 'types/airplane.type';
import { Controller } from 'interfaces/controller';

export class InputGroupController implements Controller {
  model: InputGroupModel;
  view: InputGroupView;
  raceService: RaceService;

  constructor(model: InputGroupModel, view: InputGroupView) {
    this.model = model;
    this.view = view;
    this.raceService = new RaceService();

    this.view.buttonClickListener(this.buttonClickHandler.bind(this));

    if (this.model.type === 'update') {
      eventBus.subscribe(
        EventTypes.selectAirplane,
        this.displaySelectedAirplane.bind(this),
      );
    }
  }

  async buttonClickHandler(name: string, color: string, id?: number) {
    if (this.model.type === 'create') {
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

    if (this.model.type === 'update' && id) {
      await this.raceService.updateAirplane({ name, color, id });
      eventBus.publish(EventTypes.fetchAirplanes);
    }
  }

  displaySelectedAirplane(data: unknown) {
    this.view.setData(data as Airplane);
  }

  init() {
    this.view.render();
  }
}
