import { HandleError, ResponseOptions } from "@amrogamal/shared-code";
import { auth } from "../../configs/firebase.config";
import jwt from "jsonwebtoken";
import { UserRequestType } from "../../types/request.type";
import { SecurityDtoType } from "../../dtos/user/security.dto";
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

  generateToken = warpError(async (user: any): Promise<ResponseOptions> => {
    const payload = {
      userId: user.userId,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      name: user.name,
      profileImage: user.profileImage,
      dateToJoin: user.dateToJoin,
      sign_up_provider: user.sign_up_provider,
      sign_in_provider: user.sign_in_provider,
      isEmailVerified: user.isEmailVerified,
      lastSeen: user.lastSeen,
    };
    const accessToken = await auth.createCustomToken(user.userId, payload);
    return {
      accessToken,
    };
  });
}
