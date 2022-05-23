import { ERROR_CODES, ERROR_NAME_AlREADY_EXISTS } from '../constants';
import { CustomError } from './CustomError';

export class AlreadyExistsError extends CustomError {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AlreadyExistsError);
    }

    this.name = ERROR_NAME_AlREADY_EXISTS;
    this.code = ERROR_CODES[ERROR_NAME_AlREADY_EXISTS];
  }
}
