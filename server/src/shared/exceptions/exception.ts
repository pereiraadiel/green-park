export class Exception extends Error {
  service: string;
  context: string | string[];
  code: number;

  constructor(exception: Exception) {
    super();
    Object.assign(this, exception);
  }
}

export const ExceptionStatus = {
  NotFound: {
    message: 'Entity not found for parameter offered',
    code: 404,
    name: 'NotFound',
  },
  MimetypeNotAllowed: {
    message: 'File mimetype is not allowed',
    code: 415,
    name: 'MimetypeNotAllowed',
  },
  ServiceError: {
    message: 'The service is unavailable',
    code: 503,
    name: 'ServiceError',
  },
  ServerError: {
    message: 'An unexpected error has occurred on server',
    code: 500,
    name: 'ServerError',
  },
} as const;
