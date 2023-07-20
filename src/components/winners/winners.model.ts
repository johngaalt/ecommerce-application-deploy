import { Winner } from 'types/winners.type';

export class WinnersModel {
  winners: Winner[] = [];
  title = 'Winners';
  count = 0;
  currentPage = 1;
  limit = 7;
}
