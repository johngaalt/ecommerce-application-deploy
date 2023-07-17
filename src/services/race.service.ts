import { Airplane, AirplaneResponse } from 'types/airplane.type';
import { DriveAirplaneResponse, StartAirplaneResponse } from 'types/race.type';

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

  async startAirplane(id: number): Promise<StartAirplaneResponse> {
    const response = await fetch(
      `http://localhost:3000/engine?id=${id}&status=started`,
      {
        method: 'PATCH',
      },
    );
    return await response.json();
  }

  async driveAirplane(id: number): Promise<DriveAirplaneResponse> {
    const response = await fetch(
      `http://localhost:3000/engine?id=${id}&status=drive`,
      {
        method: 'PATCH',
      },
    );

    // if (!response.ok) {
    //   if (response.status === 500) {
    //     return {
    //       success: false,
    //     };
    //   }
    // }

    return await response.json();
  }

  async stopAirplane(id: number): Promise<StartAirplaneResponse> {
    const response = await fetch(
      `http://localhost:3000/engine?id=${id}&status=stopped`,
      {
        method: 'PATCH',
      },
    );
    return await response.json();
  }
}
