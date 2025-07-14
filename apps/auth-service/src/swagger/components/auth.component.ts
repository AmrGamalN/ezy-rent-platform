/**
 * @swagger
 * components:
 *   schemas:
 *     LoginEmailDto:
 *       type: object
 *       description: Login by email
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: amr5189520@gmail.com
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           example: Amr123456789@
 *
 *     LoginPhoneDto:
 *       description: Login by phone
 *       type: object
 *       required:
 *         - phoneNumber
 *         - password
 *       properties:
 *         phoneNumber:
 *           type: string
 *           format: phone
 *           description: User phone number
 *           example: "+201200812638"
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           example: Amr123456789@
 *
 *     LoginFacebookDto:
 *       type: object
 *       required:
 *         - idToken
 *       properties:
 *         idToken:
 *           type: string
 *           description: Enter user idToken
 *
 *     LoginGoogleDto:
 *       type: object
 *       required:
 *         - idToken
 *       properties:
 *         idToken:
 *           type: string
 *           description: Enter user idToken
 *
 *     VerifyPhoneDto:
 *       type: object
 *       required:
 *         - idToken
 *       properties:
 *         idToken:
 *           type: string
 *           description: Enter user idToken
 *
 *     OtpDto:
 *       type: object
 *       required:
 *         - otp
 *       properties:
 *         otp:
 *           type: string
 *           format: otp
 *           description: User otp
 *
 *     SendResetPasswordLinkDto:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: amr5189520@gmail.com
 *
 *     ResetPasswordDto:
 *       type: object
 *       required:
 *         - password
 *         - confirmPassword
 *       properties:
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           example: Amr123456789@
 *         confirmPassword:
 *           type: string
 *           format: password
 *           description: User password
 *           example: Amr123456789@
 *
 *     RegisterEmailDto:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *         - confirmPassword
 *         - terms
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: amr5189520@gmail.com
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           example: Amr123456789@
 *         username:
 *           type: string
 *           description: User username
 *           example: amr
 *         confirmPassword:
 *           type: string
 *           format: password
 *           description: User confirm password
 *           example: Amr123456789@
 *         terms:
 *           type: boolean
 *           description: User terms
 *           example: true
 *
 *     ResendEmailDto:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: amr5189520@gmail.com
 *
 *     RegisterPhoneDto:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - username
 *         - terms
 *       properties:
 *         phoneNumber:
 *           type: string
 *           format: phone
 *           description: User phone number
 *           example: "+201200812638"
 *         username:
 *           type: string
 *           description: User username
 *           example: amr
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           example: Amr123456789@
 *         confirmPassword:
 *           type: string
 *           format: password
 *           description: User confirm password
 *           example: Amr123456789@
 *         terms:
 *           type: boolean
 *           description: User terms
 *           example: true
 *
 *     RegisterSendOtpDto:
 *       type: object
 *       required:
 *         - phoneNumber
 *       properties:
 *         phoneNumber:
 *           type: string
 *           format: phone
 *           description: User phone number
 *           example: "+201200812638"
 */

// ____________________________________Parameters____________________________________

/**
 * @swagger
 * components:
 *   parameters:
 *    Id:
 *      name: id
 *      in: path
 *      required: true
 *      description: Enter ID
 *      type: string
 *
 *    UserId:
 *      name: userId
 *      in: path
 *      required: true
 *      description: Enter User ID
 *      type: string
 */

// __________________________ ResponseOptions __________________________

/**
 * @swagger
 * components:
 *   responses:
 *     SuccessResponse:
 *       description: Success Response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 default: true
 *               status:
 *                 type: number
 *                 default: 200
 *                 example: 200
 *               message:
 *                 type: string
 *                 default: OK
 *                 example: OK
 *               data:
 *                 type: object
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BaseResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: number
 *         pagination:
 *           type: object
 *         count:
 *           type: number
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *
 *     AddressResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/AddressGetDTO'
 *
 *     ProfileResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/ProfileGetDTO'
 *
 *     UserResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/UserGetDTO'
 *
 *     SecurityResponse:
 *       description: Successfully
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/BaseResponse'
 *               - type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/SecurityGetDTO'
 */
