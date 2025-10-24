import express from 'express';
import LoginRoutes from './login.route';
import RegisterRoutes from './register.route';
import SecurityRoutes from './security.route';
import { LoginController } from '../../controller/auth/login.controller';
import { SecurityController } from '../../controller/auth/security.controller';
import { userAuthorization } from '../../util/authorization.util';
import { HandleError } from '@amrogamal/shared-code';

const { handleError } = HandleError.getInstance();
const controller = LoginController.getInstance();
const securityController = SecurityController.getInstance();
const router = express.Router();
router.use('/', LoginRoutes);
router.use('/', RegisterRoutes);
router.use('/', SecurityRoutes);

router.post(
  '/logout',
  userAuthorization,
  handleError(controller.logout.bind(controller)),
);

router.get(
  '/me',
  userAuthorization,
  handleError(controller.getMe.bind(controller)),
);

router.post(
  '/send-code',
  handleError(securityController.sendOtp.bind(controller)),
);

router.post(
  '/verify-code',
  handleError(securityController.verifyOtp.bind(controller)),
);

router.post(
  '/reset-password',
  handleError(securityController.resetPassword.bind(controller)),
);

export default router;
