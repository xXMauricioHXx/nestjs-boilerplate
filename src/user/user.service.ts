import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';
import { UserRepository } from './user.repository';
import { UserNotFoundException } from './exception/user-not-found.exception';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly jsonplaceholderService: JsonplaceholderService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findByUsername(username);
  }

  async fetch(): Promise<string[]> {
    const externalUsers = await this.jsonplaceholderService.findUsers();
    return await this.userRepository.syncByExternalIds(
      externalUsers.map(externalUser => ({
        externalId: externalUser.id.toString(),
        username: externalUser.username,
        name: externalUser.name,
        emailAddress: externalUser.email,
      }))
    );
  }
}
