import { InputGroupModel } from './input-group.model';
import { InputGroupView } from './input-group.view';

export class InputGroupController {
  model: InputGroupModel;
  view: InputGroupView;

  constructor(model: InputGroupModel, view: InputGroupView) {
    this.model = model;
    this.view = view;
  }
}
