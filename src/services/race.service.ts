import { HOST } from 'constants/host';
import { Airplane, AirplaneResponse } from 'types/airplane.type';
import { DriveAirplaneResponse, StartAirplaneResponse } from 'types/race.type';

export class RaceService {
  async getAirplanes(page = 1, limits = 7): Promise<AirplaneResponse> {
    const response = await fetch(
      `${HOST}/garage?_page=${page}&_limit=${limits}`,
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
    const response = await fetch(`${HOST}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });
    return await response.json();
  }

  async updateAirplane(data: Airplane): Promise<Airplane> {
    const response = await fetch(`${HOST}/garage/${data.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });
    return await response.json();
  }

  async removeAirplane(id: number): Promise<void> {
    const response = await fetch(`${HOST}/garage/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  }

  async startAirplane(id: number): Promise<StartAirplaneResponse> {
    const response = await fetch(`${HOST}/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });
    return await response.json();
  }

  async driveAirplane(id: number): Promise<DriveAirplaneResponse> {
    const response = await fetch(`${HOST}/engine?id=${id}&status=drive`, {
      method: 'PATCH',
    });

    return await response.json();
  }

  async stopAirplane(id: number): Promise<StartAirplaneResponse> {
    const response = await fetch(`${HOST}/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    return await response.json();
  }

  async getAirplane(id: number): Promise<Airplane> {
    const response = await fetch(`${HOST}/garage/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      global.console.error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
}
