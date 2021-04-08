import { UserExceptionFilter } from 'src/user/user-exception.filter';
import { UserNotFoundException } from 'src/user/exception';
import {
  NotFoundException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';

describe('UserExceptionFilter', () => {
  class UserExceptionFilterTest extends UserExceptionFilter {
    transformException(exception: any) {
      return super.transformException(exception);
    }
  }
  const userExceptionFilter = new UserExceptionFilterTest();

  describe('#transformException', () => {
    it('should transform UserNotFoundException to NotFoundException', () => {
      const exception = new UserNotFoundException();

      const result = userExceptionFilter.transformException(exception);

      expect(result).toBeInstanceOf(NotFoundException);
      expect(result.getResponse()).toEqual({
        code: exception.code,
        message: exception.message,
      });
    });
    it('should transform Error to InternalServerError', () => {
      const exception = new Error('test');

      const result = userExceptionFilter.transformException(exception);

      expect(result).toBeInstanceOf(InternalServerErrorException);
    });
    it('should return error when receive HttpException', () => {
      const exception = new HttpException({ message: 'Not found' }, 404);

      const result = userExceptionFilter.transformException(exception);

      expect(result).toBe(exception);
    });
  });
});
