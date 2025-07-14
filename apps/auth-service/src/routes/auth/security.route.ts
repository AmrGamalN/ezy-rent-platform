import express from 'express';
import { SecurityController } from '../../controller/auth/security.controller';
import { expressValidator } from '../../middleware/express.middleware';
import {
  validateOtp,
  validateResetPassword,
  validateSendResetPasswordLink,
} from '../../validation/auth/login.validator';
import { userAuthorization } from '../../util/authorization.util';
import { HandleError } from '@amrogamal/shared-code';

const { handleError } = HandleError.getInstance();
const controller = SecurityController.getInstance();
const router = express.Router();

router.post(
  '/security/2fa/generate',
  userAuthorization,
  handleError(controller.generate2FA.bind(controller)),
);

router.post(
  '/security/2fa/verify',
  userAuthorization,
  expressValidator(validateOtp()),
  handleError(controller.verify2FA.bind(controller)),
);

router.post(
  '/security/send-reset-password',
  expressValidator(validateSendResetPasswordLink()),
  handleError(controller.sendResetpasswordLink.bind(controller)),
);

router.post(
  '/security/update-password',
  userAuthorization,
  expressValidator(validateResetPassword()),
  handleError(controller.updatePassword.bind(controller)),
);

export default router;
