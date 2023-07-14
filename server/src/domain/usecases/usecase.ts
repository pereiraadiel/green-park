import { Exception } from '../../shared/exceptions/exception';
import { ServiceErrorException } from '../../shared/exceptions/serviceError.exception';

export abstract class UseCase {
  abstract SERVICE_NAME: string;

  catchException(exception: any, context: string | string[]) {
    console.error(exception);
    if (exception instanceof Exception) {
      throw Exception;
    }
    throw new ServiceErrorException(context, this.SERVICE_NAME);
  }
}
