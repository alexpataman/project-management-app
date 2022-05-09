import { ErrorData } from '../types/errors';

export class ValidationError extends Error {
  public data: ErrorData | undefined;

  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    this.name = 'ValidationError';
  }
}
