import { LoginController } from 'src/login/login.controller';
import { LoginService } from 'src/login/login.service';
import { Test } from '@nestjs/testing';
import { AuthDTO } from 'src/login/dto/auth.dto';

describe('LoginController', () => {
  let loginController: LoginController;
  let loginService: LoginService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: LoginService, useValue: new LoginService(null, null) },
      ],
      controllers: [LoginController],
    }).compile();

    loginController = module.get<LoginController>(LoginController);
    loginService = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(loginController).toBeDefined();
    expect(loginService).toBeDefined();
  });

  describe('#auth', () => {
    it('should return the user token  when user to be found in database', async () => {
      const token = '1';
      const data: AuthDTO = {
        username: 'test',
      };

      const res = {
        setHeader: jest.fn(),
        send: jest.fn(),
      };

      jest.spyOn(loginService, 'auth').mockImplementation(async () => token);

      //@ts-ignore
      await loginController.auth(data, res);

      expect(loginService.auth).toBeCalledWith(data);
      expect(res.setHeader).toBeCalledWith('User-Info', `Bearer ${token}`);
      expect(res.send).toBeCalled();
    });
  });
});
