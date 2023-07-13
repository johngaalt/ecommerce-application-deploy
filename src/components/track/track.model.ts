import { Airplane } from 'types/airplane.type';

export class TrackModel {
  name: string;
  color: string;
  id: number;

  constructor(airplane: Airplane) {
    this.name = airplane.name;
    this.color = airplane.color;
    this.id = airplane.id;
  }
}
