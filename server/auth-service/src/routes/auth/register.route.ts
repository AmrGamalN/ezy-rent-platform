import express from 'express';
import { RegisterController } from '../../controllers/auth/register.controller';
import { AuthMiddleware } from '../../middlewares/authentication.middleware';
import { expressValidator } from '../../middlewares/express.middleware';
import {
  validateRegisterPhone,
  validateRegisterEmail,
  validateResendEmail,
} from '../../validations/auth/register.validator';
import { HandleError } from '@amrogamal/shared-code';

const { handleError } = HandleError.getInstance();
const authMiddleware = AuthMiddleware.getInstance();
const controller = RegisterController.getInstance();
const router = express.Router();

/**
 *  @swagger
 * /auth/register/email:
 *    post:
 *      summary: Register by email
 *      tags: [Register]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterEmailDto'
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
  '/register/email',
  expressValidator(validateRegisterEmail()),
  handleError(controller.registerEmail.bind(controller)),
);

/**
 *  @swagger
 * /auth/resend-email:
 *    post:
 *      summary: Verify email
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResendEmailDto'
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
  '/resend-email',
  expressValidator(validateResendEmail()),
  handleError(controller.resendEmail.bind(controller)),
);

/**
 *  @swagger
 * /auth/verify-email/{token}:
 *    get:
 *      summary: Verify email
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
router.get(
  '/verify-email/:token',
  handleError(controller.verifyEmail.bind(controller)),
);

/**
 *  @swagger
 *  /auth/register/facebook:
 *    post:
 *      summary: Register by facebook
 *      tags: [Register]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginFacebookDto'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/SuccessResponse'
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal Server Error
 */
router.post(
  '/register/facebook',
  authMiddleware.verifyFirebaseProvider,
  handleError(controller.registerFacebook.bind(controller)),
);

/**
 *  @swagger
 *  /auth/register/google:
 *    post:
 *      summary: Register by google
 *      tags: [Register]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginGoogleDto'
 *      responses:
 *        200:
 *          $ref: '#/components/responses/SuccessResponse'
 *        400:
 *          description: Bad Request
 *        401:
 *          description: Unauthorized
 *        500:
 *          description: Internal Server Error
 */
router.post(
  '/register/google',
  authMiddleware.verifyFirebaseProvider,
  handleError(controller.registerGoogle.bind(controller)),
);

/**
 *  @swagger
 * /auth/register/phone:
 *    post:
 *      summary: Register by phone
 *      tags: [Register]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RegisterPhoneDto'
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
  '/register/phone',
  expressValidator(validateRegisterPhone()),
  handleError(controller.registerPhone.bind(controller)),
);

/**
 *  @swagger
 * /auth/verify-phone:
 *    post:
 *      summary: Verify phone
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/VerifyPhoneDto'
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
  '/verify-phone',
  authMiddleware.verifyFirebaseProvider,
  handleError(controller.verifyPhone.bind(controller)),
);

export default router;
