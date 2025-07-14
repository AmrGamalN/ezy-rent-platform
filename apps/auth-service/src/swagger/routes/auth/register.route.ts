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
