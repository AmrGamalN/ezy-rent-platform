import express from 'express';
import { LoginController } from '../../controller/auth/login.controller';
import { expressValidator } from '../../middleware/express.middleware';
import { AuthMiddleware } from '../../middleware/authentication.middleware';
import {
  validateLoginPhone,
  validateLoginEmail,
  validateOtp,
} from '../../validation/auth/login.validator';
import { HandleError } from '@amrogamal/shared-code';
const { handleError } = HandleError.getInstance();
const controller = LoginController.getInstance();
const authMiddleware = AuthMiddleware.getInstance();
const router = express.Router();

router.post(
  '/login/email',
  expressValidator(validateLoginEmail()),
  handleError(controller.loginEmail.bind(controller)),
);

router.post(
  '/login/phone',
  expressValidator(validateLoginPhone()),
  handleError(controller.loginPhone.bind(controller)),
);

router.post(
  '/login/2fa',
  authMiddleware.verify2FATempToken,
  expressValidator(validateOtp()),
  handleError(controller.login2FA.bind(controller)),
);

router.post(
  '/login/facebook',
  authMiddleware.verifyFirebaseProvider,
  handleError(controller.loginFacebook.bind(controller)),
);

router.post(
  '/login/google',
  authMiddleware.verifyFirebaseProvider,
  handleError(controller.loginGoogle.bind(controller)),
);

export default router;
