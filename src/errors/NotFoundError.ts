import { ERROR_CODES, ERROR_NAMES } from '../constants';
import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }

    this.name = ERROR_NAMES.NOT_FOUND;
    this.code = ERROR_CODES[ERROR_NAMES.NOT_FOUND];
  }
}
