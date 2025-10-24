import { AuthMiddleware } from '../middleware/authentication.middleware';
const authMiddleware = AuthMiddleware.getInstance();

export const userAuthorization = [
  authMiddleware.verifyToken,
  authMiddleware.authorization(['user', 'admin', 'manager']),
];

export const adminAuthorization = [
  authMiddleware.verifyToken,
  authMiddleware.authorization(['admin', 'manager']),
];
