import { HandleError, ResponseOptions } from '@amrogamal/shared-code';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UserToken } from '../../types/request.type';
import { SecurityDtoType } from '../../dto/user/security.dto';
import config from '../../config/env.config';
const { warpError } = HandleError.getInstance();
export class TokenService {
  private static instanceService: TokenService;
  public static getInstance(): TokenService {
    if (!TokenService.instanceService) {
      TokenService.instanceService = new TokenService();
    }
    return TokenService.instanceService;
  }

  generate2faToken = (
    credential: Record<string, string>,
  ): Record<string, string> => {
    return {
      tempToken: jwt.sign(credential, config.jwt.secret),
    };
  };

  generateToken = warpError(
    async (payload: UserToken): Promise<ResponseOptions> => {
      const createToken = (expiresIn: string): string => {
        const token = jwt.sign(payload, config.jwt.secret, {
          expiresIn: expiresIn,
          algorithm: 'HS256',
        } as SignOptions);
        return token;
      };

      const accessToken = createToken('1h');
      const refreshToken = createToken('14d');

      return {
        data: {
          accessToken,
          refreshToken,
        },
      };
    },
  );

  createPayload = async (security: SecurityDtoType): Promise<UserToken> => {
    const payload: UserToken = {
      userId: security.userId,
      email: security.email as string,
      role: security.role as 'user' | 'admin' | 'manager',
    };
    return payload;
  };
}
