import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthDTO } from './dto/auth.dto';
import { Response } from 'express';

@Controller('/login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async auth(@Body() data: AuthDTO, @Res() res: Response): Promise<void> {
    const token = await this.loginService.auth(data);

    res.setHeader('User-Info', `Bearer ${token}`);
    res.send();
  }
}
