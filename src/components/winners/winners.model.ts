import { OrderOptions, SortOptions, WinnerAirplane } from 'types/winners.type';

export class WinnersModel {
  winners: WinnerAirplane[] = [];
  title = 'Winners';
  count = 0;
  currentPage = 1;
  limit = 10;
  order?: OrderOptions;
  sort?: SortOptions;
}
