import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';

import {
  ERROR_CODE_AlREADY_EXISTS,
  ERROR_CODE_CONFLICT,
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_VALIDATION_ERROR,
  LOCAL_STORAGE_TOKEN_ID,
} from '../../constants';
import { AlreadyExistsError } from '../../errors/AlreadyExistsError';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { NotFoundError } from '../../errors/NotFoundError';
import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { ValidationError } from '../../errors/ValidationError';
import { storage } from '../../helpers/storage';

export abstract class Base {
  public API_HOST = process.env.REACT_APP_API_URL;

  protected defaultHeaders: AxiosRequestHeaders;

  constructor() {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  getException(error: AxiosError): Error {
    if (!error.response) {
      return error;
    }

    const { status, statusText = '' } = error.response;

    switch (status) {
      case ERROR_CODE_VALIDATION_ERROR:
        return new ValidationError(statusText);
      case ERROR_CODE_CONFLICT:
      case ERROR_CODE_AlREADY_EXISTS:
        return new AlreadyExistsError(statusText);
      case ERROR_CODE_UNAUTHORIZED:
        return new UnauthorizedError(statusText);
      case ERROR_CODE_FORBIDDEN:
        return new ForbiddenError(statusText);
      case ERROR_CODE_NOT_FOUND:
        return new NotFoundError(statusText);
      default:
        return new Error(statusText);
    }
  }

  getInstance() {
    return axios.create({
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${storage.get(LOCAL_STORAGE_TOKEN_ID)}`,
      },
    });
  }

  async sendRequest(response: Promise<AxiosResponse>) {
    return response
      .then((result) => result.data)
      .catch((error) => {
        throw this.getException(error as AxiosError);
      });
  }
}
