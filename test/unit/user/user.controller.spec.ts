import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { Test } from '@nestjs/testing';
import { User } from 'src/user/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: new UserService(null, null) },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('#findAll', () => {
    it('should return all users registered', async () => {
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
      jest.spyOn(userService, 'findAll').mockImplementation(async () => users);
      const result = await userController.findAll();

      expect(result).toEqual(users);
      expect(userService.findAll).toBeCalled();
    });
  });
  describe('#findById', () => {
    it('should return user by id', async () => {
      const param = { id: '1' };
      const now = new Date();
      const user = {
        id: '1',
        name: 'Test',
        externalId: '1',
        username: 'Test',
        emailAddress: 'test@gmail.com',
        createdAt: now,
        updatedAt: now,
      };

      jest.spyOn(userService, 'findById').mockImplementation(async () => user);

      const result = await userController.findById(param);

      expect(result).toEqual(user);
      expect(userService.findById).toBeCalledWith(param.id);
    });
  });
});
