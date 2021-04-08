import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { AuthDTO } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class LoginService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async auth(data: AuthDTO): Promise<string> {
    const { username } = data;
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return jwt.sign({ username }, this.configService.get('jwt.secret'));
  }
}
