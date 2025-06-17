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
 *         - phone
 *         - password
 *       properties:
 *         phone:
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
 *         - phone
 *         - username
 *         - terms
 *       properties:
 *         phone:
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
 *         - phone
 *       properties:
 *         phone:
 *           type: string
 *           format: phone
 *           description: User phone number
 *           example: "+201200812638"
 */