import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
