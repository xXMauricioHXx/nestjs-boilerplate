import { UnauthorizedException } from '@nestjs/common';

export class AuthenticationException extends UnauthorizedException {
  constructor() {
    super({
      code: 'AUTHENTICATION_EXCEPTION',
      message: 'Invalid authentication credentials or insufficient permission.',
    });
  }
}
