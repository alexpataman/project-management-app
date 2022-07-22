import { ERROR_CODES, ERROR_NAMES } from '../constants';
import { CustomError } from './CustomError';

export class ForbiddenError extends CustomError {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }

    this.name = ERROR_NAMES.FORBIDDEN;
    this.code = ERROR_CODES[ERROR_NAMES.FORBIDDEN];
  }
}
