import { TaskRequest, TaskResponse, UpdateTaskRequest } from '../../types/api';
import { Base } from './Base';

class Tasks extends Base {
  public API_PATH_BOARDS = `${this.API_HOST}/boards`;

  async getTasks(boardId: string, columnId: string): Promise<TaskResponse[]> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.get(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}/tasks`)
    );
  }

  async createTask(boardId: string, columnId: string, data: TaskRequest): Promise<TaskResponse> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.post(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}/tasks`, data)
    );
  }

  async getTaskById(boardId: string, columnId: string, taskId: string): Promise<TaskResponse[]> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.get(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`)
    );
  }

  async deleteTask(boardId: string, columnId: string, taskId: string): Promise<null> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.delete(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`)
    );
  }

  async updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    data: UpdateTaskRequest
  ): Promise<TaskResponse> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.put(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`, data)
    );
  }
}

export const tasks = new Tasks();
