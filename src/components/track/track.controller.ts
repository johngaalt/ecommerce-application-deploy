import { TrackModel } from './track.model';
import { TrackView } from './track.view';

export class TrackController {
  model: TrackModel;
  view: TrackView;

  constructor(model: TrackModel, view: TrackView) {
    this.model = model;
    this.view = view;
  }
}
