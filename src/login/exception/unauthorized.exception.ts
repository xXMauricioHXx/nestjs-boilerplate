import { CodedException } from 'src/shared/coded.exception';

export class UnauthorizedException extends CodedException {
  constructor() {
    super('UNAUTHORIZED', 'Unauthorized user.');
  }
}
