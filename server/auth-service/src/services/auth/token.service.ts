import { HandleError } from "../../middlewares/handleError.middleware";
import { ResponseOptions } from "../../types/response.type";
import { auth } from "../../configs/firebase.config";
import jwt from "jsonwebtoken";
const { warpError } = HandleError.getInstance();
export class TokenService {
  private static instanceService: TokenService;
  public static getInstance(): TokenService {
    if (!TokenService.instanceService) {
      TokenService.instanceService = new TokenService();
    }
    return TokenService.instanceService;
  }

  generate2faToken = (credential: Record<string, string>) => {
    return {
      tempToken: jwt.sign(credential, String(process.env.JWT_SECRET)),
    };
  };

  generateToken = warpError(
    async (userId: string): Promise<ResponseOptions> => {
      const accessToken = await auth.createCustomToken(userId);
      return {
        accessToken,
      };
    }
  );
}
