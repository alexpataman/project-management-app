import { BoardsCreateRequest, BoardsResponse } from '../../types/api';
import { Base } from './Base';

class Boards extends Base {
  public API_PATH_USERS = `${this.API_HOST}/boards`;

  async getBoards(): Promise<BoardsResponse[] | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_USERS}`));
  }

  async createBoard(board: BoardsCreateRequest): Promise<BoardsResponse> {
    const instance = this.getInstance();
    return this.sendRequest(instance.post(`${this.API_PATH_USERS}`, board));
  }

  async deleteBoard(id: string): Promise<BoardsResponse[] | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.delete(`${this.API_PATH_USERS}/${id}`));
  }
}

export const boards = new Boards();
