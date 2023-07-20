export interface GetWinnersParams {
  _page?: number;
  _limit?: number;
  _sort?: SortOptions;
  _order?: OrderOptions;
}

type SortOptions = 'id' | 'wins' | 'time';
type OrderOptions = 'ASC' | 'DESC';

export interface Winner {
  id: number;
  wins: number;
  time: number;
}
export interface WinnersResponse {
  items: Winner[];
  count: string | null;
}

export interface UpdateWinnerParams {
  wins?: number;
  time?: number;
}
