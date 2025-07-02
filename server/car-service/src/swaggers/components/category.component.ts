/**
 * @swagger
 * components:
 *   schemas:
 *     BaseCategory:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           description: Name of the category
 *           example: "SUV"
 *         description:
 *           type: string
 *           description: Detailed description about the category
 *           example: "Spacious SUVs suitable for family trips"
 *         categoryImage:
 *           type: array
 *           description: Category image files
 *           items:
 *             type: string
 *             format: binary
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-06-30T15:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-06-30T15:30:00Z"
 *
 *     CreateCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category
 *           example: "SUV"
 *         description:
 *           type: string
 *           description: Detailed description about the category
 *           example: "Spacious SUVs suitable for family trips"
 *         categoryImage:
 *           type: array
 *           description: Category image files
 *           items:
 *             type: string
 *             format: binary
 *
 *     UpdateCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category
 *           example: "SUV"
 *         description:
 *           type: string
 *           description: Detailed description about the category
 *           example: "Updated description for SUV category"
 *         categoryImage:
 *           type: array
 *           description: Category image files to update
 *           items:
 *             type: string
 *             format: binary
 *         key:
 *           type: string
 *           description: Image key you want to update or delete
 */