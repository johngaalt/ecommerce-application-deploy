import { WinnerAirplane } from 'types/winners.type';

export class WinnersTableModel {
  winners: WinnerAirplane[] = [];
  currentPage = 1;
  limit = 10;
}
