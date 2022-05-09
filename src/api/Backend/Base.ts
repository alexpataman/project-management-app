import { AxiosError, AxiosRequestHeaders } from 'axios';

import {
  ERROR_CODE_AlREADY_EXISTS,
  ERROR_CODE_FORBIDDEN,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_UNAUTHORIZED,
  ERROR_CODE_VALIDATION_ERROR,
} from '../../constants';
import { AlreadyExistsError } from '../../errors/AlreadyExistsError';
import { ForbiddenError } from '../../errors/ForbiddenError';
import { NotFoundError } from '../../errors/NotFoundError';
import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { ValidationError } from '../../errors/ValidationError';
import { GetTokens, SetTokens, Tokens } from '../../types/api';

const emptyTokens = {
  token: '',
  refreshToken: '',
};

export abstract class Base {
  public API_HOST = process.env.REACT_APP_API_URL;

  protected getLocalTokens: GetTokens | undefined;

  protected setLocalTokens: SetTokens | undefined;

  protected defaultHeaders: AxiosRequestHeaders;

  constructor(getTokens?: GetTokens, setTokens?: SetTokens) {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.getLocalTokens = getTokens;
    this.setLocalTokens = setTokens;
  }

  getTokens() {
    if (this.getLocalTokens) {
      return this.getLocalTokens();
    }
    return emptyTokens;
  }

  setTokens(tokens: Tokens) {
    if (this.setLocalTokens) {
      this.setLocalTokens(tokens);
    }
  }

  getException(error: AxiosError): Error {
    if (!error.response) {
      return error;
    }

    const { status, data } = error.response;

    if (typeof data === 'string') {
      switch (status) {
        case ERROR_CODE_VALIDATION_ERROR:
          return new ValidationError(data);
        case ERROR_CODE_AlREADY_EXISTS:
          return new AlreadyExistsError(data);
        case ERROR_CODE_UNAUTHORIZED:
          return new UnauthorizedError(data);
        case ERROR_CODE_FORBIDDEN:
          return new ForbiddenError(data);
        case ERROR_CODE_NOT_FOUND:
          return new NotFoundError(data);
        default:
          return new Error(data);
      }
    } else {
      return new Error('Unknown error');
    }
  }
}
