export class InputGroupModel {
  type: 'create' | 'update';

  constructor(type: 'create' | 'update') {
    this.type = type;
  }
}
