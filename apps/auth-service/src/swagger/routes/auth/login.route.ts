/**
 *  @swagger
 *  /auth/logout:
 *    post:
 *      summary: Logout
 *      tags: [Login]
 *      security:
 *       - bearerAuth: []
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
