import { AuthMiddleware } from 'src/shared/auth.middleware';
import { AuthenticationException } from 'src/shared/exception/authentication.exception';

describe('AuthMiddleware', () => {
  let authMiddleware = new AuthMiddleware();

  describe('#use', () => {
    it('should return AuthenticationException when token to equal null or dont start with Bearer', () => {
      const mock = {
        req: {
          headers: {
            'user-info': 'test',
          },
        },
        res: {},
        next: jest.fn(),
      };

      const { req, res, next } = mock;
      let error = null;
      try {
        //@ts-ignore
        authMiddleware.use(req, res, next);
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(AuthenticationException);
    });
    it('should set the user token in request', () => {
      const mock = {
        req: {
          headers: {
            'user-info': 'Bearer test',
          },
          userInfo: null,
        },
        res: {},
        next: jest.fn(),
      };

      const { req, res, next } = mock;

      //@ts-ignore
      authMiddleware.use(req, res, next);

      expect(req.userInfo).toEqual('test');
    });
  });
});
