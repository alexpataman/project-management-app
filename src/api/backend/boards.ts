import { BoardRequest, BoardResposne } from '../../types/api';
import { Base } from './Base';

class Boards extends Base {
  public API_PATH_BOARDS = `${this.API_HOST}/boards`;

  async getBoards(): Promise<BoardResposne[]> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}`));
  }

  async createBoard(data: BoardRequest): Promise<BoardResposne> {
    const instance = this.getInstance();
    return this.sendRequest(instance.post(`${this.API_PATH_BOARDS}`, data, this.defaultHeaders));
  }

  async getBoardById(id: string): Promise<BoardResposne> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}/${id}`));
  }
}

export const boards = new Boards();
