import { Exception, ExceptionStatus } from './exception';

export class NotFoundException extends Exception {
  constructor(context: string | string[], service: string) {
    super({
      context,
      service,
      ...ExceptionStatus.NotFound,
    });
  }
}
