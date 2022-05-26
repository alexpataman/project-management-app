import { BoardRequest, BoardResponse } from '../../types/api';
import { Base } from './Base';

class Boards extends Base {
  public API_PATH_BOARDS = `${this.API_HOST}/boards`;

  getBoards(): Promise<BoardResponse[] | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}`));
  }

  createBoard(board: BoardRequest): Promise<BoardResponse> {
    const instance = this.getInstance();
    return this.sendRequest(instance.post(`${this.API_PATH_BOARDS}`, board));
  }

  deleteBoard(id: string): Promise<BoardResponse[] | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.delete(`${this.API_PATH_BOARDS}/${id}`));
  }

  updateBoard(id: string, board: BoardRequest): Promise<BoardResponse[] | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.put(`${this.API_PATH_BOARDS}/${id}`, board));
  }

  getBoardById(id: string): Promise<BoardResponse | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}/${id}`));
  }
}

export const boards = new Boards();
