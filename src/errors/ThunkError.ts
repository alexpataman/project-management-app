import { SerializedError } from '@reduxjs/toolkit';

import { ERROR_CODES } from '../constants';
import { CustomError } from './CustomError';

export class ThunkError extends CustomError {
  constructor(data: SerializedError) {
    super();

    const { name } = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ThunkError);
    }

    this.name = name || '';
    this.code = ERROR_CODES[name as keyof typeof ERROR_CODES] || 0;
  }
}
