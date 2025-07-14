import { AuthMiddleware } from '../middleware/authentication.middleware';
const authMiddleware = AuthMiddleware.getInstance();

export const userAuthorization = [
  authMiddleware.verifyFirebaseToken,
  authMiddleware.checkStatus,
  authMiddleware.authorization(['user', 'admin', 'manager']),
];

export const adminAuthorization = [
  authMiddleware.verifyFirebaseToken,
  authMiddleware.authorization(['admin', 'manager']),
];
