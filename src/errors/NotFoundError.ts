import { ERROR_CODES, ERROR_NAME_NOT_FOUND } from '../constants';
import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }

    this.name = ERROR_NAME_NOT_FOUND;
    this.code = ERROR_CODES[ERROR_NAME_NOT_FOUND];
  }
}
