export interface Airplane {
  name: string;
  color: string;
  id: number;
}

export interface AirplaneResponse {
  items: Airplane[];
  count: number;
}
