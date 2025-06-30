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

/**
 * @swagger
 * components:
 *   parameters:
 *     Page:
 *       name: page
 *       in: query
 *       description: Enter page
 *       schema:
 *         type: integer
 *         default: 1
 *     Limit:
 *       name: limit
 *       in: query
 *       description: Enter limit
 *       schema:
 *         type: integer
 *         default: 10
 *     Name:
 *       name: name
 *       in: query
 *       description: Enter car name
 *       schema:
 *         type: string
 *     Brand:
 *       name: brand
 *       in: query
 *       description: Enter car brand
 *       schema:
 *         type: string
 *     CarModel:
 *       name: carModel
 *       in: query
 *       description: Enter car model
 *       schema:
 *         type: string
 *     Year:
 *       name: year
 *       in: query
 *       description: Enter car year
 *       schema:
 *         type: integer
 *     Color:
 *       name: color
 *       in: query
 *       description: Enter car color
 *       schema:
 *         type: string
 *         enum: ["Red", "Blue", "Black", "White", "Gray", "Green", "Yellow"]
 *     AvailableFrom:
 *       name: availableFrom
 *       in: query
 *       description: Available from date
 *       schema:
 *         type: string
 *         format: date
 *     AvailableTo:
 *       name: availableTo
 *       in: query
 *       description: Available to date
 *       schema:
 *         type: string
 *         format: date
 *     City:
 *       name: city
 *       in: query
 *       description: Enter city
 *       schema:
 *         type: string
 *         enum: ["Cairo", "Alexandria", "Giza", "Suez", "Port Said"]
 *     MinPrice:
 *       name: minPrice
 *       in: query
 *       description: Minimum price per day
 *       schema:
 *         type: number
 *     MaxPrice:
 *       name: maxPrice
 *       in: query
 *       description: Maximum price per day
 *       schema:
 *         type: number
 */
