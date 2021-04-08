import { Test } from '@nestjs/testing';
import { UserSchedule } from 'src/user/user.schedule';
import { UserService } from 'src/user/user.service';

describe('UserSchedule', () => {
  let userSchedule: UserSchedule;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserSchedule,
        { provide: UserService, useValue: new UserService(null, null) },
      ],
    }).compile();

    userSchedule = module.get<UserSchedule>(UserSchedule);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userSchedule).toBeDefined();
  });

  describe('#runFetch', () => {
    it('should fetch users from jsonplaceholde api', async () => {
      const fetchedIds = ['1'];
      jest
        .spyOn(userService, 'fetch')
        .mockImplementation(async () => fetchedIds);

      await userSchedule.runFetch();

      expect(userService.fetch).toBeCalled();
    });
  });
});
