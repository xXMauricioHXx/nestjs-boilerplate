import { LoginService } from 'src/login/login.service';
import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import jwt from 'jsonwebtoken';
import { sign } from 'crypto';

describe('LoginService', () => {
  let loginService: LoginService;
  let userService: UserService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginService,
        { provide: UserService, useValue: new UserService(null, null) },
        { provide: ConfigService, useValue: new ConfigService(null) },
      ],
    }).compile();

    loginService = module.get<LoginService>(LoginService);
    userService = module.get<UserService>(UserService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(loginService).toBeDefined();
    expect(userService).toBeDefined();
    expect(ConfigService).toBeDefined();
  });

  describe('#auth', () => {
    it('should return unauthorized exception when user to be equal false', async () => {
      const data = {
        username: 'test',
      };

      jest.spyOn(userService, 'findByUsername').mockImplementation(undefined);

      let error = null;
      try {
        await loginService.auth(data);
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(UnauthorizedException);
    });
    it('should return JWT from user name when user in found', async () => {
      const now = new Date();
      const token = '1';
      const secret = '1';

      const user: User = {
        createdAt: now,
        updatedAt: now,
        emailAddress: 'test@test.com',
        username: 'Test',
        externalId: '1',
        id: '1',
        name: 'Test',
      };

      jest
        .spyOn(userService, 'findByUsername')
        .mockImplementation(async () => user);

      jest.spyOn(jwt, 'sign').mockImplementation(() => token);
      jest.spyOn(configService, 'get').mockImplementation(() => secret);

      const data = {
        username: 'Test',
      };

      const result = await loginService.auth(data);

      expect(result).toEqual(secret);
      expect(userService.findByUsername).toBeCalledWith(data.username);
      expect(jwt.sign).toBeCalledWith({ username: data.username }, secret);
    });
  });
});
