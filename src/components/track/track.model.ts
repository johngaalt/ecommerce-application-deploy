import { Airplane } from 'types/airplane.type';

export class TrackModel {
  name: string;
  color: string;
  id: number;
  time: number;
  isFinished: boolean;

  constructor(airplane: Airplane) {
    this.name = airplane.name;
    this.color = airplane.color;
    this.id = airplane.id;
    this.time = 0;
    this.isFinished = false;
  }
}
