import { CodedValidatorPipe } from 'src/shared/coded-validation.pipe';
import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

describe('CodedValidatorPipe', () => {
  describe('#transformException', () => {
    it('should return validation error without details', () => {
      const codedValidation = new CodedValidatorPipe();

      const result = codedValidation.transformException([]);

      expect(result).toBeInstanceOf(BadRequestException);
      expect(result.getResponse()).toEqual({
        code: 'VALIDATION_FAILED',
        message: 'Validation failed',
        details: [],
      });
    });
    it('should return validation error with details', () => {
      const codedValidation = new CodedValidatorPipe();

      const error: ValidationError[] = [{ property: 'test' }];
      const result = codedValidation.transformException(error);

      expect(result).toBeInstanceOf(BadRequestException);
      expect(result.getResponse()).toEqual({
        code: 'VALIDATION_FAILED',
        message: 'Validation failed',
        details: error,
      });
    });
  });
});
