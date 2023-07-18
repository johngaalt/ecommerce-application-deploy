import { Airplane } from 'types/airplane.type';

export class RaceModel {
  airplanes: Airplane[] = [];
  title = 'Garage';
  count = 0;
  currentPage = 1;
  limit = 7;
}
