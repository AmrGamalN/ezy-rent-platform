/**
 * @swagger
 * /elastic/car/{id}:
 *   get:
 *     summary: Get a car by ID from Elasticsearch
 *     tags: [ElasticSearch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the car
 *     responses:
 *       200:
 *         description: Car found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusText:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */

/**
 * @swagger
 * /elastic/car/mapping:
 *   post:
 *     summary: Create an Elasticsearch index mapping
 *     tags: [ElasticSearch]
 *     responses:
 *       200:
 *         description: Mapping created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 */
