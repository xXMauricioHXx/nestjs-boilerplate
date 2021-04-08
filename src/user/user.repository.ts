import {
  Repository,
  EntityRepository,
  Transaction,
  TransactionRepository,
  In,
} from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByExternalIds(externalIds: string[]): Promise<User[]> {
    return this.find({
      where: { externalId: In(externalIds) },
    });
  }

  findByUsername(username: string): Promise<User> {
    return this.findOne({
      where: { username },
    });
  }

  @Transaction()
  async syncByExternalIds(
    records: Partial<User>[],
    @TransactionRepository() repository?: UserRepository
  ): Promise<string[]> {
    const externalIds = records.map(record => record.externalId);
    const actualUsers = await repository.findByExternalIds(externalIds);

    return await Promise.all(
      records.map(async record => {
        const actualUser = actualUsers.find(
          user => user.externalId === record.externalId
        );

        if (actualUser) {
          actualUser.emailAddress = record.emailAddress;
          actualUser.name = record.name;
          actualUser.username = record.username;

          await repository.save(actualUser);
          return actualUser.id;
        }

        const user = new User();
        user.emailAddress = record.emailAddress;
        user.name = record.name;
        user.username = record.username;
        user.externalId = record.externalId;

        const { id } = await repository.save(user);
        return id;
      })
    );
  }
}
