import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserExceptionFilter } from './user-exception.filter';
import { FindUserDto } from './dto/find-user.dto';

@Controller('users')
@UseFilters(new UserExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findById(@Param() param: FindUserDto): Promise<User> {
    const { id } = param;
    return this.userService.findById(id);
  }
}
