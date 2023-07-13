import { Airplane } from 'types/airplane.type';

export class RaceService {
  async getAirplanes(): Promise<Airplane[]> {
    const response = await fetch('http://localhost:3000/garage', {
      method: 'GET',
    });
    return await response.json();
  }
}
