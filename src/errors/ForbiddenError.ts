import { ERROR_CODES, ERROR_NAME_FORBIDDEN } from '../constants';
import { CustomError } from './CustomError';

export class ForbiddenError extends CustomError {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }

    this.name = ERROR_NAME_FORBIDDEN;
    this.code = ERROR_CODES[ERROR_NAME_FORBIDDEN];
  }
}
