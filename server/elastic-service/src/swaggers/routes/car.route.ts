/**
 * @swagger
 * /elastic/car/{id}:
 *   get:
 *     summary: Get a car by ID from Elasticsearch
 *     description: Get a car by ID from Elasticsearch
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
 * /elastic/car/seacrh:
 *   get:
 *     summary: Search for cars in Elasticsearch
 *     description: Search for cars in Elasticsearch
 *     tags: [ElasticSearch]
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/Name'
 *       - $ref: '#/components/parameters/Brand'
 *       - $ref: '#/components/parameters/model'
 *       - $ref: '#/components/parameters/Year'
 *       - $ref: '#/components/parameters/Color'
 *       - $ref: '#/components/parameters/AvailableFrom'
 *       - $ref: '#/components/parameters/AvailableTo'
 *       - $ref: '#/components/parameters/City'
 *       - $ref: '#/components/parameters/MinPrice'
 *       - $ref: '#/components/parameters/MaxPrice'
 *     responses:
 *       200:
 *         description: Cars found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusText:
 *                   type: string
 *                 data:
 *                   type: object
 *       404:
 *         description: Cars not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /elastic/car/mapping:
 *   post:
 *     summary: Create an Elasticsearch index mapping
 *     description: Create an Elasticsearch index mapping
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
