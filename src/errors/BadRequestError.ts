import { ERROR_CODES, ERROR_NAMES } from '../constants';
import { CustomError } from './CustomError';

export class BadRequestError extends CustomError {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }

    this.name = ERROR_NAMES.BAD_REQUEST;
    this.code = ERROR_CODES[ERROR_NAMES.BAD_REQUEST];
  }
}
