import { HeaderModel } from "./header.model";
import { HeaderView } from "./header.view";


export class HeaderController {
  model: HeaderModel;
  view: HeaderView;

  constructor(model: HeaderModel, view: HeaderView) {
    this.model = model;
    this.view = view;
  }
} 
