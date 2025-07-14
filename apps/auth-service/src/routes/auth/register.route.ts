import express from 'express';
import { RegisterController } from '../../controller/auth/register.controller';
import { AuthMiddleware } from '../../middleware/authentication.middleware';
import { expressValidator } from '../../middleware/express.middleware';
import {
  validateRegisterPhone,
  validateRegisterEmail,
  validateResendEmail,
} from '../../validation/auth/register.validator';
import { HandleError } from '@amrogamal/shared-code';

const { handleError } = HandleError.getInstance();
const authMiddleware = AuthMiddleware.getInstance();
const controller = RegisterController.getInstance();
const router = express.Router();

router.post(
  '/register/email',
  expressValidator(validateRegisterEmail()),
  handleError(controller.registerEmail.bind(controller)),
);

router.post(
  '/resend-email',
  expressValidator(validateResendEmail()),
  handleError(controller.resendEmail.bind(controller)),
);

router.get(
  '/verify-email/:token',
  handleError(controller.verifyEmail.bind(controller)),
);

router.post(
  '/register/facebook',
  authMiddleware.verifyFirebaseProvider,
  handleError(controller.registerFacebook.bind(controller)),
);

router.post(
  '/register/google',
  authMiddleware.verifyFirebaseProvider,
  handleError(controller.registerGoogle.bind(controller)),
);

router.post(
  '/register/phone',
  expressValidator(validateRegisterPhone()),
  handleError(controller.registerPhone.bind(controller)),
);

router.post(
  '/verify-phone',
  authMiddleware.verifyFirebaseProvider,
  handleError(controller.verifyPhone.bind(controller)),
);

export default router;
