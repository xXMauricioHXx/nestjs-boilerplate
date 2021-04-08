import { IsNotEmpty } from 'class-validator';

export class AuthDTO {
  @IsNotEmpty()
  username: string;
}
