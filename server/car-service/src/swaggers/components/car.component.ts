/**
 * @swagger
 * components:
 *  schemas:
 *    Car:
 *      type: object
 *      properties:
 *        userId:
 *          type: string
 *          example: "user_987654321"
 *        phone:
 *          type: string
 *          example: "+201234567890"
 *        name:
 *          type: string
 *          example: "Toyota Corolla 2022"
 *        description:
 *          type: string
 *          example: "A clean, well-maintained car perfect for city drives."
 *        carModel:
 *          type: string
 *          example: "Corolla"
 *        brand:
 *          type: string
 *          example: "Toyota"
 *        year:
 *          type: integer
 *          example: 2022
 *        color:
 *          type: string
 *          example: "White"
 *        images:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              url:
 *                type: string
 *                example: "https://example.com/images/car1.jpg"
 *              key:
 *                type: string
 *                example: "car1.jpg"
 *        pricePerDay:
 *          type: number
 *          example: 750
 *        availableFrom:
 *          type: string
 *          format: date
 *          example: "2025-06-30"
 *        availableTo:
 *          type: string
 *          format: date
 *          example: "2025-07-15"
 *        location:
 *          type: object
 *          properties:
 *            city:
 *              type: string
 *              example: "Cairo"
 *            address:
 *              type: string
 *              example: "Nasr City, Street 10"
 *            coordinates:
 *              type: object
 *              properties:
 *                lat:
 *                  type: number
 *                  example: 30.0444
 *                lng:
 *                  type: number
 *                  example: 31.2357
 *        isAvailable:
 *          type: boolean
 *          example: true
 *        guarantees:
 *          type: object
 *          properties:
 *            hasInsurance:
 *              type: boolean
 *              example: true
 *            insuranceDetails:
 *              type: string
 *              example: "Full coverage insurance until Dec 2025"
 *            licenseValid:
 *              type: boolean
 *              example: true
 *            requiresDeposit:
 *              type: boolean
 *              example: true
 *            depositAmount:
 *              type: number
 *              example: 2000
 *            additionalNotes:
 *              type: string
 *              example: "No smoking in the car"
 *        createdAt:
 *          type: string
 *          example: "2025-06-29T12:00:00Z"
 *        updatedAt:
 *          type: string
 *          example: "2025-06-29T12:00:00Z"
 */
