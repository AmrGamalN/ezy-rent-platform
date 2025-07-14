/**
 * @swagger
 * components:
 *   schemas:
 *     BaseOrder:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64a7e9991e9d1f001f2f3c01"
 *         userId:
 *           type: string
 *           example: "user_123456"
 *         carId:
 *           type: string
 *           example: "car_987654"
 *         transactionId:
 *           type: string
 *           nullable: true
 *           example: "txn_112233"
 *         paymobOrderId:
 *           type: string
 *           nullable: true
 *           example: "paymob_445566"
 *         availableFrom:
 *           type: string
 *           format: date-time
 *           example: "2025-07-10T15:00:00Z"
 *         availableTo:
 *           type: string
 *           format: date-time
 *           example: "2025-07-15T15:00:00Z"
 *         discount:
 *           type: number
 *           minimum: 0
 *           example: 5
 *         totalPrice:
 *           type: number
 *           minimum: 0
 *           example: 2500
 *         isPaid:
 *           type: boolean
 *           example: false
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *           example: "pending"
 *         paymentStatus:
 *           type: string
 *           enum: [pending, paid, failed]
 *           example: "pending"
 *         paymentMethod:
 *           type: string
 *           enum: [cash, card, wallet, paymob]
 *           example: "paymob"
 *         customer:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Amr Gamal"
 *             phone:
 *               type: string
 *               example: "+201234567890"
 *             email:
 *               type: string
 *               format: email
 *               example: "amr@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-06-30T15:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-06-30T15:30:00Z"
 *
 *     CreateOrder:
 *       type: object
 *       properties:
 *         carId:
 *           type: string
 *           example: "car_123456"
 *         paymentMethod:
 *           type: string
 *           enum: [cash, card, wallet, paymob]
 *           example: "paymob"
 *
 *     UpdateOrder:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *           example: "confirmed"
 *         isPaid:
 *           type: boolean
 *           example: true
 *         paymentStatus:
 *           type: string
 *           enum: [pending, paid, failed]
 *           example: "paid"
 */
