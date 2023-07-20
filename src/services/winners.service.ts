import {
  GetWinnersParams,
  UpdateWinnerParams,
  Winner,
  WinnersResponse,
} from 'types/winners.type';

export class WinnersService {
  async getWinners(params: GetWinnersParams): Promise<WinnersResponse> {
    let url = `http://localhost:3000/winners?_page=${params?.page}&_limit=${params?.limit}`;

    if (params?.sort) {
      url += `&_sort=${params.sort}`;
    }

    if (params?.order) {
      url += `&_order=${params.order}`;
    }
    const response = await fetch(url, {
      method: 'GET',
    });
    const winners: Winner[] = await response.json();
    const totalWinnersCount: string | null =
      response.headers.get('X-Total-Count');
    return { items: winners, count: Number(totalWinnersCount) };
  }

  async getWinner(id: number): Promise<Winner> {
    const url = `http://localhost:3000/winners/${id}`;
    const response = await fetch(url, { method: 'GET' });

    return await response.json();
  }

  async createWinner(winner: Winner): Promise<Winner> {
    const url = `http://localhost:3000/winners`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(winner),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newWinner: Winner = await response.json();
    return newWinner;
  }

  async deleteWinner(id: number): Promise<void> {
    const url = `http://localhost:3000/winners/${id}`;

    const response = await fetch(url, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  async updateWinner(
    id: number,
    updateParams: UpdateWinnerParams,
  ): Promise<Winner> {
    const url = `http://localhost:3000/winners/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateParams),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedWinner: Winner = await response.json();
    return updatedWinner;
  }
}
