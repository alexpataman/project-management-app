import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';

import {
  ERROR_CODES,
  ERROR_NAME_AlREADY_EXISTS,
  ERROR_NAME_BAD_REQUEST,
  ERROR_NAME_CONFLICT,
  ERROR_NAME_FORBIDDEN,
  ERROR_NAME_NOT_FOUND,
  ERROR_NAME_UNAUTHORIZED,
  ERROR_NAME_VALIDATION_ERROR,
  LOCAL_STORAGE_TOKEN_ID,
} from '../../constants';
import {
  AlreadyExistsError,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../../errors';
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
      case ERROR_CODES[ERROR_NAME_BAD_REQUEST]:
        return new BadRequestError(statusText);
      case ERROR_CODES[ERROR_NAME_VALIDATION_ERROR]:
        return new ValidationError(statusText);
      case ERROR_CODES[ERROR_NAME_CONFLICT]:
      case ERROR_CODES[ERROR_NAME_AlREADY_EXISTS]:
        return new AlreadyExistsError(statusText);
      case ERROR_CODES[ERROR_NAME_UNAUTHORIZED]:
        return new UnauthorizedError(statusText);
      case ERROR_CODES[ERROR_NAME_FORBIDDEN]:
        return new ForbiddenError(statusText);
      case ERROR_CODES[ERROR_NAME_NOT_FOUND]:
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

  sendRequest(response: Promise<AxiosResponse>) {
    return response
      .then((result) => result.data)
      .catch((error) => {
        throw this.getException(error as AxiosError);
      });
  }
}
