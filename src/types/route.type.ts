export interface Route {
  name: string;
  pageNumber: number;
  init: () => void;
}
