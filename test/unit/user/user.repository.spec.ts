import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';
import { In } from 'typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { mockTransaction } from '../helpers';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  const now = new Date();
  const users: User[] = [
    {
      id: '1',
      name: 'Test',
      externalId: '1',
      username: 'Test',
      emailAddress: 'test@gmail.com',
      createdAt: now,
      updatedAt: now,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('#findByExternalIds', () => {
    it('should return data by external id', async () => {
      const externalIds = ['1', '2'];

      jest.spyOn(userRepository, 'find').mockImplementation(async () => users);
      const result = await userRepository.findByExternalIds(externalIds);

      expect(result).toEqual(users);
      expect(userRepository.find).toBeCalledWith({
        where: { externalId: In(externalIds) },
      });
    });
  });

  describe('#findByUsername', () => {
    it('should return user by username', async () => {
      const [user] = users;
      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(async () => user);

      const username = 'Test';
      const result = await userRepository.findByUsername(username);

      expect(result).toEqual(user);
      expect(userRepository.findOne).lastCalledWith({ where: { username } });
    });
  });

  describe('#syncByExternalIds', () => {
    it('should update user data when externalId to found in database', async () => {
      mockTransaction(userRepository);
      jest
        .spyOn(userRepository, 'findByExternalIds')
        .mockImplementation(async () => users);

      jest.spyOn(userRepository, 'save').mockImplementation(async () => null);

      const result = await userRepository.syncByExternalIds(users);

      const [user] = users;

      expect(result).toEqual(users.map(user => user.id));
      expect(userRepository.findByExternalIds).toBeCalledWith(
        users.map(user => user.externalId)
      );
      expect(userRepository.save).toBeCalledWith(user);
    });
    it('should create a new user when externalId not found in database', async () => {
      mockTransaction(userRepository);
      const [user] = users;

      jest
        .spyOn(userRepository, 'findByExternalIds')
        .mockImplementation(async () => []);

      jest.spyOn(userRepository, 'save').mockImplementation(async () => user);

      const result = await userRepository.syncByExternalIds(users);

      expect(result).toEqual(users.map(user => user.id));
      expect(userRepository.findByExternalIds).toBeCalledWith(
        users.map(user => user.externalId)
      );
      expect(userRepository.save).toBeCalledWith({
        emailAddress: user.emailAddress,
        externalId: user.externalId,
        name: user.name,
        username: user.username,
      });
    });
  });
});
