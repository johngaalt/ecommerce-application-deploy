import { Airplane, AirplaneResponse } from 'types/airplane.type';

export class RaceService {
  async getAirplanes(page = 1, limits = 7): Promise<AirplaneResponse> {
    const response = await fetch(
      `http://localhost:3000/garage?_page=${page}&_limit=${limits}`,
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

  async updateAirplane(data: Airplane): Promise<Airplane> {
    const response = await fetch(`http://localhost:3000/garage/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });
    return await response.json();
  }

  async removeAirplane(id: number): Promise<void> {
    const response = await fetch(`http://localhost:3000/garage/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }
}
