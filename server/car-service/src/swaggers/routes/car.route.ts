/**
 * @swagger
 * /cars/{id}:
 *  get:
 *    summary: Get a car by ID
 *    tags: [Car]
 *    description: Get a car by ID
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: The ID of the car
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A list of cars
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/BaseCar'
 */

/**
 * @swagger
 * /cars/count:
 *   get:
 *     summary: Get the count of cars
 *     description: Get the count of cars
 *     security:
 *       - bearerAuth: []
 *     tags: [Car]
 *     responses:
 *       200:
 *         description: The count of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: integer
 */

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Add a new car
 *     description: Add a new car
 *     security:
 *       - bearerAuth: []
 *     tags: [Car]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/create'
 *     responses:
 *       201:
 *         description: Car created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cars/{id}:
 *   put:
 *     summary: Update a car by ID
 *     description: Update a car by ID
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCar'
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Car not found
 *       409:
 *         description: Conflict
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cars/upload-image/{id}:
 *   put:
 *     summary: Upload car image
 *     description: Upload car image
 *     tags: [Car]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CarImageUpload'
 *     responses:
 *       200:
 *         description: Car image uploaded successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Car not found
 *       409:
 *         description: Conflict
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cars/remove-image/{id}:
 *   delete:
 *     summary: Delete car image
 *     description: Delete car image
 *     security:
 *       - bearerAuth: []
 *     tags: [Car]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               keys:
 *                 type: array
 *                 required: true
 *                 description: Array of image keys
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Car image deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     tags: [Car]
 *     description: Delete a car by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
