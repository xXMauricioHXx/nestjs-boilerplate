import {
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { UserNotFoundException } from './exception';
import { HttpExceptionFilter } from 'src/shared/http-exception.filter';

@Catch(Error)
export class UserExceptionFilter extends HttpExceptionFilter {
  protected transformException(exception: any): HttpException {
    if (exception instanceof HttpException) {
      return exception;
    }
    const { code, message } = exception;

    switch (exception.constructor) {
      case UserNotFoundException:
        return new NotFoundException({
          code,
          message,
        });

      default:
        return new InternalServerErrorException();
    }
  }

  catch(exception: any, host: ArgumentsHost) {
    super.catch(this.transformException(exception), host);
  }
}
