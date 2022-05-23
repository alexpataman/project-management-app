import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from '../../types/api';
import { Base } from './Base';

class Authorization extends Base {
  async signIn(data: LoginRequest): Promise<LoginResponse> {
    const instance = this.getInstance();
    return this.sendRequest(instance.post(`${this.API_HOST}/signin`, data));
  }

  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    const instance = this.getInstance();
    return this.sendRequest(instance.post(`${this.API_HOST}/signup`, data));
  }
}

export const authorization = new Authorization();
