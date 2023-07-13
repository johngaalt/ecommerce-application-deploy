import eventBus from 'services/event.service';
import { TrackModel } from './track.model';
import { TrackView } from './track.view';
import { EventTypes } from 'types/event.enum';

export class TrackController {
  model: TrackModel;
  view: TrackView;

  constructor(model: TrackModel, view: TrackView) {
    this.model = model;
    this.view = view;

    this.view.selectButtonClickListener(
      this.selectButtonClickHandler.bind(this),
    );
  }

  selectButtonClickHandler() {
    eventBus.publish(EventTypes.selectAirplane, this.model);
  }
}
