import { ButtonGroupModel } from './button-group.model';
import { ButtonGroupView } from './button-group.view';

export class ButtonGroupController {
  model: ButtonGroupModel;
  view: ButtonGroupView;

  constructor(model: ButtonGroupModel, view: ButtonGroupView) {
    this.model = model;
    this.view = view;
  }
}
