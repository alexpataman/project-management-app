import axios, { AxiosError } from 'axios';

import { Tokens, UserResponse } from '../../types/api';
import { Base } from './Base';

export class Users extends Base {
  public API_PATH_USERS = `${this.API_HOST}/users`;

  async createUser(data: Pick<UserResponse, 'name' | 'email' | 'password'>): Promise<UserResponse> {
    try {
      const result = await axios.post(this.API_PATH_USERS, data, this.defaultHeaders);
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  }

  async getUser(id: UserResponse['id']): Promise<UserResponse | null> {
    const instance = this.getAuthInstance(id);

    try {
      const result = await instance.get(`${this.API_PATH_USERS}/${id}`);
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  }

  getAuthInstance(id: UserResponse['id']) {
    const instance = axios.create({
      baseURL: this.API_PATH_USERS,
      headers: this.defaultHeaders,
    });

    instance.interceptors.request.use(
      (config) => {
        const tokens = this.getTokens();
        config.headers = {
          ...this.defaultHeaders,
          Authorization: `Bearer ${tokens.token}`,
        };
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const tokens = this.getTokens();
        const originalConfig = { retried: false, ...error.config };
        if (originalConfig.url !== '/signin' && error.response) {
          if (error.response?.status === 401 && !originalConfig.retried) {
            originalConfig.retried = true;

            try {
              const newTokens = await this.refreshToken(id, tokens.refreshToken);
              this.setTokens(newTokens);
              return instance(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  async refreshToken(
    id: UserResponse['id'],
    refreshToken: Tokens['refreshToken']
  ): Promise<Tokens> {
    const headers = {
      ...this.defaultHeaders,
      Authorization: `Bearer ${refreshToken}`,
    };
    try {
      const result = await axios.get(`${this.API_PATH_USERS}/${id}/tokens`, {
        headers,
      });
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  }
}
