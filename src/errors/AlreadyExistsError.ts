export class AlreadyExistsError extends Error {
  constructor(...params: string[]) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AlreadyExistsError);
    }

    this.name = 'AlreadyExistsError';
  }
}
