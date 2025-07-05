import { HandleError, ResponseOptions } from '@amrogamal/shared-code';
import { auth } from '../../configs/firebase.config';
import jwt from 'jsonwebtoken';
import { UserToken } from '../../types/request.type';
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
      tempToken: jwt.sign(credential, String(process.env.JWT_SECRET)),
    };
  };

  generateToken = warpError(
    async (payload: UserToken): Promise<ResponseOptions> => {
      const accessToken = await auth.createCustomToken(payload.userId, payload);
      return {
        accessToken,
      };
    },
  );
}
