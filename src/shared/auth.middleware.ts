import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthenticationException } from './exception/authentication.exception';
import { HttpRequest } from './interfaces/http-request';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: HttpRequest, res: Response, next: NextFunction) {
    const token = req.headers['user-info'] as string;

    if (!token || !token.startsWith('Bearer ')) {
      throw new AuthenticationException();
    }

    const replacedToken = token.replace('Bearer ', '');
    req.userInfo = replacedToken as string;
    next();
  }
}
