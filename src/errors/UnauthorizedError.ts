export class UnauthorizedError extends Error {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }

    this.name = 'UnauthorizedError';
  }
}
