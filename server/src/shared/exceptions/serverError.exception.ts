import { Exception, ExceptionStatus } from './exception';

export class ServerErrorException extends Exception {
  constructor(context: string | string[], service: string) {
    super({
      context,
      service,
      ...ExceptionStatus.ServerError,
    });
  }
}
