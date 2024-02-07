import { Airplane } from './airplane.type';

export interface GetWinnersParams {
  page?: number;
  limit?: number;
  sort?: SortOptions;
  order?: OrderOptions;
}

export type SortOptions = 'id' | 'wins' | 'time';
export type OrderOptions = 'ASC' | 'DESC';

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export type WinnerAirplane = Winner & Airplane;

export interface WinnersResponse {
  items: Winner[];
  count: number;
}

export interface UpdateWinnerParams {
  wins?: number;
  time?: number;
}