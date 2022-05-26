import { ColumnRequest, ColumnResponse } from '../../types/api';
import { Base } from './Base';

class Columns extends Base {
  public API_PATH_BOARDS = `${this.API_HOST}/boards`;

  getColumns(boardId: string): Promise<ColumnResponse[]> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}/${boardId}/columns`));
  }

  createColumn(boardId: string, data: ColumnRequest): Promise<ColumnResponse> {
    const instance = this.getInstance();
    return this.sendRequest(instance.post(`${this.API_PATH_BOARDS}/${boardId}/columns`, data));
  }

  getColumnsById(boardId: string, columnId: string): Promise<ColumnResponse> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}`));
  }

  deleteColumn(boardId: string, columnId: string): Promise<null> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.delete(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}`)
    );
  }

  updateColumn(boardId: string, columnId: string, data: ColumnRequest): Promise<ColumnResponse> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.put(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}`, data)
    );
  }
}

export const columns = new Columns();
