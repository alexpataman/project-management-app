export const ERROR_NAME_BAD_REQUEST = 'BadRequestError';
export const ERROR_NAME_UNAUTHORIZED = 'UnauthorizedError';
export const ERROR_NAME_FORBIDDEN = 'ForbiddenError';
export const ERROR_NAME_NOT_FOUND = 'NotFoundError';
export const ERROR_NAME_CONFLICT = 'ConflictError';
export const ERROR_NAME_AlREADY_EXISTS = 'AlreadyExistsError';
export const ERROR_NAME_VALIDATION_ERROR = 'ValidationError';

export const ERROR_CODES = {
  [ERROR_NAME_BAD_REQUEST]: 400,
  [ERROR_NAME_UNAUTHORIZED]: 401,
  [ERROR_NAME_FORBIDDEN]: 403,
  [ERROR_NAME_NOT_FOUND]: 404,
  [ERROR_NAME_CONFLICT]: 409,
  [ERROR_NAME_AlREADY_EXISTS]: 417,
  [ERROR_NAME_VALIDATION_ERROR]: 422,
};
