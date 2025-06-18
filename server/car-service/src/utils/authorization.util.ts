import { AuthMiddleware } from "../middlewares/authentication.middleware";
const authMiddleware = AuthMiddleware.getInstance();

export const userAuthorization = [
  authMiddleware.verifyFirebaseToken,
  authMiddleware.authorization(["user", "admin", "manager"]),
];

export const adminAuthorization = [
  authMiddleware.verifyFirebaseToken,
  authMiddleware.authorization(["admin", "manager"]),
];
