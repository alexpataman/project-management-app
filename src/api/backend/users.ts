import { SignUpRequest, User } from '../../types/api';
import { Base } from './Base';

class Users extends Base {
  public API_PATH_USERS = `${this.API_HOST}/users`;

  async getUsers(): Promise<User[] | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_USERS}`));
  }

  async getUser(id: string): Promise<User | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.get(`${this.API_PATH_USERS}/${id}`));
  }

  async updateUser(id: string, data: SignUpRequest): Promise<User | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.put(`${this.API_PATH_USERS}/${id}`, data));
  }

  async deleteUser(id: number): Promise<User | null> {
    const instance = this.getInstance();
    return this.sendRequest(instance.delete(`${this.API_PATH_USERS}/${id}`));
  }
}

export const users = new Users();
