import { Airplane, AirplaneResponse } from 'types/airplane.type';

export class RaceService {
  async getAirplanes(): Promise<AirplaneResponse> {
    const response = await fetch(
      'http://localhost:3000/garage?_page=1&_limit=7',
      {
        method: 'GET',
      },
    );
    const items = await response.json();
    const count = await response.headers.get('X-Total-Count');
    return {
      items,
      count: Number(count),
    };
  }

  async createAirplane(data: Omit<Airplane, 'id'>): Promise<Airplane> {
    const response = await fetch('http://localhost:3000/garage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });
    return await response.json();
  }
}
