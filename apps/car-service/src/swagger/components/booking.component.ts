/**
 * @swagger
 * components:
 *   schemas:
 *     BaseBooking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64a7e9991e9d1f001f2f3c01"
 *         carId:
 *           type: string
 *           example: "car_987654321"
 *         renterId:
 *           type: string
 *           example: "user_123456"
 *         ownerId:
 *           type: string
 *           example: "user_654321"
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2025-07-01T12:00:00Z"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2025-07-01T12:00:00Z"
 *         deliveryLocation:
 *           type: string
 *           example: "Cairo Airport Terminal 1"
 *         returnLocation:
 *           type: string
 *           example: "Nasr City"
 *         deliveryTime:
 *           type: string
 *           example: "10:00"
 *         returnTime:
 *           type: string
 *           example: "18:00"
 *         rentType:
 *           type: string
 *           enum: [with_driver, without_driver, airport_delivery, wedding, other]
 *           example: "with_driver"
 *         specifiedRentType:
 *           type: string
 *           nullable: true
 *           example: "ceremony only"
 *         insuranceType:
 *           type: string
 *           enum: [basic, full]
 *           example: "full"
 *         totalPrice:
 *           type: number
 *           minimum: 0
 *           example: 2000
 *         paymentMethod:
 *           type: string
 *           enum: [cash, card, wallet, paymob]
 *           example: "paymob"
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *           example: "pending"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-01T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-07-01T12:00:00Z"
 *
 *     CreateBooking:
 *       type: object
 *       required:
 *         - carId
 *         - startDate
 *         - endDate
 *         - deliveryLocation
 *         - returnLocation
 *         - deliveryTime
 *         - returnTime
 *         - rentType
 *         - insuranceType
 *         - totalPrice
 *         - paymentMethod
 *       properties:
 *         carId:
 *           type: string
 *           example: "car_123456"
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2025-07-01T12:00:00Z"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2025-07-01T12:00:00Z"
 *         deliveryLocation:
 *           type: string
 *           example: "Zamalek"
 *         returnLocation:
 *           type: string
 *           example: "Maadi"
 *         deliveryTime:
 *           type: string
 *           example: "08:30"
 *         returnTime:
 *           type: string
 *           example: "21:00"
 *         rentType:
 *           type: string
 *           enum: [with_driver, without_driver, airport_delivery, wedding, other]
 *           example: "without_driver"
 *         specifiedRentType:
 *           type: string
 *           nullable: true
 *           example: "party service"
 *         insuranceType:
 *           type: string
 *           enum: [basic, full]
 *           example: "basic"
 *         totalPrice:
 *           type: number
 *           example: 1500
 *         paymentMethod:
 *           type: string
 *           enum: [cash, card, wallet, paymob]
 *           example: "card"
 *
 *     UpdateBookingByRenter:
 *       type: object
 *       properties:
 *         startDate:
 *           type: string
 *           format: date
 *           example: "2025-07-01T12:00:00Z"
 *         endDate:
 *           type: string
 *           format: date
 *           example: "2025-07-01T12:00:00Z"
 *         deliveryLocation:
 *           type: string
 *           example: "New Cairo"
 *         returnLocation:
 *           type: string
 *           example: "6th October"
 *         deliveryTime:
 *           type: string
 *           example: "09:00"
 *         returnTime:
 *           type: string
 *           example: "22:00"
 *         rentType:
 *           type: string
 *           enum: [with_driver, without_driver, airport_delivery, wedding, other]
 *           example: "wedding"
 *         specifiedRentType:
 *           type: string
 *           nullable: true
 *           example: "for bride only"
 *         insuranceType:
 *           type: string
 *           enum: [basic, full]
 *           example: "full"
 *
 *     UpdateBookingByOwner:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *           example: "confirmed"
 */
