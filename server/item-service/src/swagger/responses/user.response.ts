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