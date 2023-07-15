import { Exception } from '../../shared/exceptions/exception';
import { ServiceErrorException } from '../../shared/exceptions/serviceError.exception';

export abstract class UseCase {
  protected abstract SERVICE_NAME: string;

  protected catchException(exception: any, context: string | string[]) {
    if (exception instanceof Exception) {
      throw Exception;
    }
    throw new ServiceErrorException(context, this.SERVICE_NAME);
  }
}
