import ms from 'ms';
import { Interval } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserSchedule {
  private readonly logger = new Logger(UserSchedule.name);

  constructor(private readonly userService: UserService) {}

  @Interval(ms('1m'))
  async runFetch(): Promise<void> {
    try {
      const fetchedIds = await this.userService.fetch();
      this.logger.log(`Successfully fetched users [${fetchedIds.join(', ')}]`);
    } catch (err) {
      this.logger.error(`Failed to fetch users (${err.stack})`);
    }
  }
}
