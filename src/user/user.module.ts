import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JsonPlaceholderModule } from 'src/jsonplaceholder/jsonplaceholder.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserSchedule } from './user.schedule';

@Module({
  imports: [JsonPlaceholderModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService, UserSchedule],
  exports: [UserService],
})
export class UserModule {}
