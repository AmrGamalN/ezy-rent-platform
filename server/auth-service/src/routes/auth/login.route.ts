import express from "express";
import { LoginController } from "../../controllers/auth/login.controller";
import { expressValidator } from "../../middlewares/express.middleware";
import { AuthMiddleware } from "../../middlewares/authentication.middleware";
import {
  validateLoginPhone,
  validateLoginEmail,
  validateOtp,
} from "../../validations/auth/login.validator";
import { HandleError } from "../../middlewares/handleError.middleware";
const { handleError } = HandleError.getInstance();
const controller = LoginController.getInstance();
const authMiddleware = AuthMiddleware.getInstance();
const router = express.Router();

/**
 *  @swagger
 * /auth/login/email:
 *    post:
 *      summary: Login by email
 *      tags: [Login]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginEmailDto'
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
  "/login/email",
  expressValidator(validateLoginEmail()),
  handleError(controller.loginEmail.bind(controller))
);

/**
 *  @swagger
 *  /auth/login/phone:
 *    post:
 *      summary: Login by phone
 *      tags: [Login]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginPhoneDto'
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
  "/login/phone",
  expressValidator(validateLoginPhone()),
  handleError(controller.loginPhone.bind(controller))
);

/**
 *  @swagger
 *  /auth/login/2fa:
 *    post:
 *      summary: Login by 2fa
 *      tags: [Login]
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
 *        500:
 *          description: Internal Server Error
 */
router.post(
  "/login/2fa",
  authMiddleware.verify2FATempToken,
  expressValidator(validateOtp()),
  handleError(controller.login2FA.bind(controller))
);

/**
 *  @swagger
 *  /auth/login/facebook:
 *    post:
 *      summary: Login by facebook
 *      tags: [Login]
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
  "/login/facebook",
  authMiddleware.verifyFirebaseProvider,
  handleError(controller.loginFacebook.bind(controller))
);

/**
 *  @swagger
 *  /auth/login/google:
 *    post:
 *      summary: Login by 2fa
 *      tags: [Login]
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
  "/login/google",
  authMiddleware.verifyFirebaseProvider,
  handleError(controller.loginGoogle.bind(controller))
);

export default router;
