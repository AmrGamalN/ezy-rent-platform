/**
 * @swagger
 * /car/{id}:
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
 *                $ref: '#/components/schemas/Car'
 */

/**
 * @swagger
 * /car/count:
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
 * /car/create:
 *   post:
 *     summary: Add a new car
 *     description: Add a new car
 *     security:
 *       - bearerAuth: []
 *     tags: [Car]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     responses:
 *       201:
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /car/update/{id}:
 *  put:
 *   summary: Update a car by ID
 *   tags: [Car]
 *   description: Update a car by ID
 *   security:
 *     - bearerAuth: []
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: The ID of the car
 *       schema:
 *         type: string
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Car'
 *   responses:
 *     200:
 *       description: Car updated successfully
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Car'
 *     400:
 *       description: Bad request
 */

/**
 * @swagger
 * /car/delete/{id}:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */
