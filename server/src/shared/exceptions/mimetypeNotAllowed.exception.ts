import { Exception, ExceptionStatus } from './exception';

export class MimetypeNotAllowedException extends Exception {
  constructor(context: string | string[], service: string) {
    super({
      context,
      service,
      ...ExceptionStatus.MimetypeNotAllowed,
    });
  }
}
