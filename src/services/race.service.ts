import { Airplane } from 'types/airplane.type';

export class RaceService {
  async getAirplanes(): Promise<Airplane[]> {
    const response = await fetch('http://localhost:3000/garage', {
      method: 'GET',
    });
    return await response.json();
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
