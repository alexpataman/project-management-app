import { BoardRequest, BoardResponse } from '../../types/api';
import { Base } from './Base';

class Boards extends Base {
  public API_PATH_BOARDS = `${this.API_HOST}/boards`;

  async getBoards(): Promise<BoardResponse[] | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}`));
  }

  async createBoard(board: BoardRequest): Promise<BoardResponse> {
    const instance = this.getInstance();
    return this.sendRequest(instance.post(`${this.API_PATH_BOARDS}`, board));
  }

  async deleteBoard(id: string): Promise<BoardResponse[] | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.delete(`${this.API_PATH_BOARDS}/${id}`));
  }

  async getBoardById(id: string): Promise<BoardResponse | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}/${id}`));
  }
}

export const boards = new Boards();
