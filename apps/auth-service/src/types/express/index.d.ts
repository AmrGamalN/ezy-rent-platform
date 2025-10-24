// apps/auth-service/src/types/express/index.d.ts
import type { UserToken } from '../request.type';
import type { FirebaseOAuthUser, FirebasePhoneUser } from '../firebase.type';

declare global {
  namespace Express {
    interface Request {
      curUser?: UserToken;
      email?: string;
      decode?: FirebaseOAuthUser | FirebasePhoneUser;

      file?: Express.Multer.File;
      files?:
        | Express.Multer.File[]
        | { [fieldname: string]: Express.Multer.File[] }; // لو multiple
    }
  }
}
