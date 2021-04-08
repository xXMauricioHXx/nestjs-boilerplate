import { Test } from '@nestjs/testing';
import { UserService } from 'src/user/user.service';
import { JsonplaceholderService } from 'src/jsonplaceholder/jsonplaceholder.service';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';
import { UserNotFoundException } from 'src/user/exception';

describe('UserService', () => {
  let userService: UserService;
  let jsonplaceholderService: JsonplaceholderService;
  let userRepository: UserRepository;

  const now = new Date();

  const users: User[] = [
    {
      createdAt: now,
      updatedAt: now,
      emailAddress: 'test@test.com',
      externalId: '1',
      id: '1',
      name: 'Test',
      username: 'Test',
    },
  ];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: JsonplaceholderService,
          useValue: new JsonplaceholderService(null),
        },
        {
          provide: UserRepository,
          useValue: new UserRepository(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    jsonplaceholderService = module.get<JsonplaceholderService>(
      JsonplaceholderService
    );
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('#findAll', () => {
    it('should return all users from database', async () => {
      jest.spyOn(userRepository, 'find').mockImplementation(async () => users);

      const result = await userService.findAll();

      expect(result).toEqual(users);
      expect(userRepository.find).toBeCalled();
    });
  });

  describe('#findById', () => {
    it('should return UserNotFoundError when user id isnt found in database', async () => {
      const [user] = users;

      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(async () => null);

      let error = null;
      try {
        await userService.findById(user.id);
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(UserNotFoundException);
      expect(userRepository.findOne).toBeCalledWith(user.id);
    });
    it('should return user by id', async () => {
      const [user] = users;

      jest
        .spyOn(userRepository, 'findOne')
        .mockImplementation(async () => user);

      const result = await userService.findById(user.id);

      expect(result).toEqual(user);
      expect(userRepository.findOne).toBeCalledWith(user.id);
    });
  });
  describe('#findByUsername', () => {
    it('should return user by username', async () => {
      const [user] = users;

      jest
        .spyOn(userRepository, 'findByUsername')
        .mockImplementation(async () => user);

      const result = await userService.findByUsername(user.username);

      expect(result).toEqual(user);
      expect(userRepository).toBeCalledWith(user.username);
    });
  });
  describe('#fetch', () => {
    it('should fetch users from jsonplaceholder to database', async () => {
      const [user] = users;

      jest
        .spyOn(jsonplaceholderService, 'findUsers')
        // @ts-ignore
        .mockImplementation(async () => users);

      jest
        .spyOn(userRepository, 'syncByExternalIds')
        .mockImplementation(async () => [user.id]);

      const result = await userService.findByUsername(user.username);

      expect(result).toEqual(user);
      expect(userRepository).toBeCalledWith(user.username);
    });
  });
});
