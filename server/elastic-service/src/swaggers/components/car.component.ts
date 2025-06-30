/**
 * @swagger
 * components:
 *  schemas:
 *    Car:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        userId:
 *          type: string
 *        phone:
 *          type: string
 *        name:
 *          type: string
 *        description:
 *          type: string
 *        carModel:
 *          type: string
 *        brand:
 *          type: string
 *        year:
 *          type: integer
 *        color:
 *          type: string
 *        images:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *              key:
 *                type: string
 *        pricePerDay:
 *          type: number
 *        availableFrom:
 *          type: string
 *          format: date
 *        availableTo:
 *          type: string
 *          format: date
 *        location:
 *          type: object
 *          properties:
 *            city:
 *              type: string
 *            address:
 *              type: string
 *            coordinates:
 *              type: object
 *              properties:
 *                lat:
 *                  type: number
 *                lng:
 *                  type: number
 *        isAvailable:
 *          type: boolean
 *        guarantees:
 *          type: object
 *          properties:
 *            hasInsurance:
 *              type: boolean
 *            insuranceDetails:
 *              type: string
 *            licenseValid:
 *              type: boolean
 *            requiresDeposit:
 *              type: boolean
 *            depositAmount:
 *              type: number
 *            additionalNotes:
 *              type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */
