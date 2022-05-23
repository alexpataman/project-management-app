import { ERROR_CODES, ERROR_NAME_UNAUTHORIZED } from '../constants';
import { CustomError } from './CustomError';

export class UnauthorizedError extends CustomError {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }

    this.name = ERROR_NAME_UNAUTHORIZED;
    this.code = ERROR_CODES[ERROR_NAME_UNAUTHORIZED];
  }
}
