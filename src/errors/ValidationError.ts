import { ERROR_CODES, ERROR_NAMES } from '../constants';
import { ErrorData } from '../types/errors';
import { CustomError } from './CustomError';

export class ValidationError extends CustomError {
  public data: ErrorData | undefined;

  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.name = ERROR_NAMES.VALIDATION_ERROR;
    this.code = ERROR_CODES[ERROR_NAMES.VALIDATION_ERROR];
  }
}
