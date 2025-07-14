/**
 *  @swagger
 *  /auth/security/2fa/generate:
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

/**
 *  @swagger
 *  /auth/security/2fa/verify:
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

/**
 *  @swagger
 *  /auth/security/send-reset-password:
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

/**
 *  @swagger
 *  /auth/security/update-password:
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
