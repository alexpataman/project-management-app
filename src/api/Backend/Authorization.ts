import axios, { AxiosError } from 'axios';

import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from '../../types/api';
import { Base } from './Base';

class Authorization extends Base {
  async signIn(data: LoginRequest): Promise<LoginResponse> {
    try {
      const result = await axios.post(`${this.API_HOST}/signin`, data, this.defaultHeaders);
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  }

  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    try {
      const result = await axios.post(`${this.API_HOST}/signup`, data, this.defaultHeaders);
      return result.data;
    } catch (error) {
      throw this.getException(error as AxiosError);
    }
  }
}

export const authorization = new Authorization();
