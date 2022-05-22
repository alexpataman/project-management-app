import { ERROR_CODES, ERROR_NAME_BAD_REQUEST } from '../constants';
import { CustomError } from './CustomError';

export class BadRequestError extends CustomError {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }

    this.name = ERROR_NAME_BAD_REQUEST;
    this.code = ERROR_CODES[ERROR_NAME_BAD_REQUEST];
  }
}
