import { ColumnRequest, ColumnResponse } from '../../types/api';
import { Base } from './Base';

class Columns extends Base {
  public API_PATH_BOARDS = `${this.API_HOST}/boards`;

  async getColumns(boardId: string): Promise<ColumnResponse[]> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}/${boardId}/columns`));
  }

  async createColumn(boardId: string, data: ColumnRequest): Promise<ColumnResponse> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.post(`${this.API_PATH_BOARDS}/${boardId}/columns`, data, this.defaultHeaders)
    );
  }

  async getColumnsById(boardId: string, columnId: string): Promise<ColumnResponse> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}`));
  }

  async deleteColumn(boardId: string, columnId: string): Promise<null> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.delete(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}`)
    );
  }

  async updateColumn(
    boardId: string,
    columnId: string,
    data: ColumnRequest
  ): Promise<ColumnResponse> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.put(
        `${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}`,
        data,
        this.defaultHeaders
      )
    );
  }
}

export const columns = new Columns();
