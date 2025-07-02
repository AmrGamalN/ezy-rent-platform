/**
 * @swagger
 * components:
 *   schemas:
 *     BaseCar:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: "user_987654321"
 *         phone:
 *           type: string
 *           example: "+201234567890"
 *         name:
 *           type: string
 *           example: "Toyota Corolla 2022"
 *         description:
 *           type: string
 *           example: "A clean, well-maintained car perfect for city drives."
 *         carModel:
 *           type: string
 *           example: "Corolla"
 *         brand:
 *           type: string
 *           example: "Toyota"
 *         year:
 *           type: integer
 *           example: 2022
 *         color:
 *           type: string
 *           example: "White"
 *         category:
 *           type: string
 *           example: "car"
 *         carImages:
 *           type: array
 *           description: Array of images
 *           items:
 *             type: string
 *             format: binary
 *         price:
 *           type: number
 *           example: 750
 *         discount:
 *           type: number
 *           example: 10
 *         availableFrom:
 *           type: string
 *           format: date-time
 *           example: "2025-06-30T15:30:00Z"
 *         availableTo:
 *           type: string
 *           format: date-time
 *           example: "2025-07-05T15:30:00Z"
 *         location:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               example: "Cairo"
 *             address:
 *               type: string
 *               example: "Nasr City, Street 10"
 *             coordinates:
 *               type: object
 *               properties:
 *                 lat:
 *                   type: number
 *                   example: 30.0444
 *                 lng:
 *                   type: number
 *                   example: 31.2357
 *         isAvailable:
 *           type: boolean
 *           example: true
 *         allowNegotiate:
 *           type: boolean
 *           example: true
 *         guarantees:
 *           type: object
 *           properties:
 *             hasInsurance:
 *               type: boolean
 *               example: true
 *             insuranceDetails:
 *               type: string
 *               example: "Full coverage insurance until Dec 2025"
 *             licenseValid:
 *               type: boolean
 *               example: true
 *             requiresDeposit:
 *               type: boolean
 *               example: true
 *             depositAmount:
 *               type: number
 *               example: 2000
 *             additionalNotes:
 *               type: string
 *               example: "No smoking in the car"
 *
 *     create:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseCar'
 *
 *     update:
 *       allOf:
 *         - $ref: '#/components/schemas/BaseCar'
 *         - type: object
 *           properties:
 *             keys:
 *               type: array
 *               description: Array of image keys you want to update
 *               items:
 *                 type: string
 *
 *     CarImageUpload:
 *       type: object
 *       properties:
 *         carImages:
 *           type: array
 *           description: Array of car images (max 5 images)
 *           items:
 *             type: string
 *             format: binary
 *
 */
