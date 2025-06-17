import express from "express";
import { SecurityController } from "../../controllers/auth/security.controller";
import { expressValidator } from "../../middlewares/express.middleware";
import {
  validateOtp,
  validateResetPassword,
  validateSendResetPasswordLink,
} from "../../validations/auth/login.validator";
import { userAuthorization } from "../../utils/authorization.util";
import { HandleError } from "../../middlewares/handleError.middleware";
const { handleError } = HandleError.getInstance();
const controller = SecurityController.getInstance();
const router = express.Router();

/**
 *  @swagger
 *  /auth/2fa/generate:
 *    post:
 *      summary: Generate 2fa
 *      tags: [Auth]
 *      responses:
 *        200:
 *          $ref: '#/components/responses/SuccessResponse'
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 *        409:
 *          description: Conflict
 *        500:
 *          description: Internal Server Error
 */
router.post(
  "/2fa/generate",
  userAuthorization,
  handleError(controller.generate2FA.bind(controller))
);

/**
 *  @swagger
 *  /auth/2fa/verify:
 *    post:
 *      summary: Verify 2fa
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OtpDto'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/SuccessResponse'
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 *        409:
 *          description: Conflict
 *        500:
 *          description: Internal Server Error
 */
router.post(
  "/2fa/verify",
  userAuthorization,
  expressValidator(validateOtp()),
  handleError(controller.verify2FA.bind(controller))
);

/**
 *  @swagger
 *  /auth/send-reset-password:
 *    post:
 *      summary: Send reset password link
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SendResetPasswordLinkDto'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/SuccessResponse'
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */
router.post(
  "/send-reset-password",
  expressValidator(validateSendResetPasswordLink()),
  handleError(controller.sendResetpasswordLink.bind(controller))
);

/**
 *  @swagger
 *  /auth/update-password/{token}:
 *    post:
 *      summary: Update password
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResetPasswordDto'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/SuccessResponse'
 *        400:
 *          description: Bad Request
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */
router.post(
  "/update-password/:token",
  userAuthorization,
  expressValidator(validateResetPassword()),
  handleError(controller.updatePassword.bind(controller))
);

export default router;
