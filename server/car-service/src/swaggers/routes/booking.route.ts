/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBooking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Cant booking your own car)
 *       409:
 *         description: Already booked
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings for the user
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BaseBooking'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BaseBooking'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /bookings/{id}/update-renter:
 *   patch:
 *     summary: Update a booking by renter (limited)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookingByRenter'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       403:
 *         description: Policy violation (too late to edit, only pending can be Edited)
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /bookings/{id}/update-status:
 *   patch:
 *     summary: Update booking status by owner
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookingByOwner'
 *     responses:
 *       200:
 *         description: Status updated
 *       403:
 *         description: Forbidden (not the owner)
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking (pending only)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted
 *       403:
 *         description: Forbidden (only pending can be deleted)
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
