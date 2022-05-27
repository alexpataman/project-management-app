import { TaskRequest, TaskResponse, UpdateTaskRequest } from '../../types/api';
import { Base } from './Base';

class Tasks extends Base {
  public API_PATH_BOARDS = `${this.API_HOST}/boards`;

  getTasks(boardId: string, columnId: string): Promise<TaskResponse[]> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.get(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}/tasks`)
    );
  }

  createTask(boardId: string, columnId: string, data: TaskRequest): Promise<TaskResponse> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.post(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}/tasks`, data)
    );
  }

  getTaskById(boardId: string, columnId: string, taskId: string): Promise<TaskResponse[]> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.get(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`)
    );
  }

  deleteTask(boardId: string, columnId: string, taskId: string): Promise<null> {
    const instance = this.getInstance();
    return this.sendRequest(
      instance.delete(`${this.API_PATH_BOARDS}/${boardId}/columns/${columnId}/tasks/${taskId}`)
    );
  }

  updateTask(
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
