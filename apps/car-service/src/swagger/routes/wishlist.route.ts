/**
 * @swagger
 * /wishlists:
 *   post:
 *     summary: Add car to wishlist
 *     description: Add car to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: string
 *                 example: "65e8f1e2f1d3a45b7e3c"
 *     responses:
 *       201:
 *         description: Added to wishlist
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Car already in wishlist
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /wishlists/{id}:
 *   get:
 *     summary: Get wishlist item by ID
 *     description: Get wishlist item by ID
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Wishlist item ID (carId)
 *     responses:
 *       200:
 *         description: Wishlist item fetched
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /wishlists:
 *   get:
 *     summary: Get all wishlist items for current user
 *     description: Get all wishlist items for current user
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Wishlist fetched
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /wishlists/{id}:
 *   delete:
 *     summary: Remove car from wishlist
 *     description: Remove car from wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the car to remove from wishlist
 *     responses:
 *       200:
 *         description: Removed from wishlist
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
