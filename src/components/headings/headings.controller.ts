import { HeadingsModel } from './headings.model';
import { HeadingsView } from './headings.view';

export class HeadingsController {
  model: HeadingsModel;
  view: HeadingsView;

  constructor(model: HeadingsModel, view: HeadingsView) {
    this.model = model;
    this.view = view;
  }
}
