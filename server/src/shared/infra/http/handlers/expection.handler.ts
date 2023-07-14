import { Catch } from '@nestjs/common/decorators';
import { BaseExceptionFilter } from '@nestjs/core/exceptions';
import { ArgumentsHost } from '@nestjs/common/interfaces';
import { getHttpData } from '../utils/exceptionHandler.util';
import { Exception } from '../../../exceptions/exception';

@Catch(Exception)
export class ExceptionHandler extends BaseExceptionFilter {
  catch(exception: Exception, host: ArgumentsHost) {
    const { req, res, date } = getHttpData(host);

    return res.code(exception.code).send({
      code: exception.code,
      message: exception.message,
      context: exception.context,
      service: exception.service,
      timestamp: date,
      path: req.path,
    });
  }
}
