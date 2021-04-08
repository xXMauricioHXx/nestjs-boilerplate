import { CodedException } from 'src/shared/coded.exception';

export class UserNotFoundException extends CodedException {
  constructor() {
    super('USER_NOT_FOUND', 'User not found.');
  }
}
