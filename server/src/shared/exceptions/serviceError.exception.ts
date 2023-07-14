import { Exception, ExceptionStatus } from './exception';

export class ServiceErrorException extends Exception {
  constructor(context: string | string[], service: string) {
    super({
      context,
      service,
      ...ExceptionStatus.ServiceError,
    });
  }
}
