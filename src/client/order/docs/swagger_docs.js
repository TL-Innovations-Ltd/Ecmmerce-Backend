/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and user order history
 */

/**
 * @swagger
 * /client/order/create:
 *   post:
 *     summary: Create an order from the user's cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *             properties:
 *               address:
 *                 $ref: '#/components/schemas/OrderAddress'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Address missing, cart empty, or stock issues
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /client/order/history:
 *   get:
 *     summary: Get the current user's order history (with payment methods)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders, including payment methods from user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderWithPayment'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /client/order/history/search:
 *   post:
 *     summary: Search/filter the current user's order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Shipped, Delivered]
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date for filtering (YYYY-MM-DD)
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date for filtering (YYYY-MM-DD)
 *               orderId:
 *                 type: string
 *                 description: Specific order ID
 *     responses:
 *       200:
 *         description: List of filtered orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderWithPayment'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderAddress:
 *       type: object
 *       required:
 *         - fullName
 *         - phone
 *         - street
 *         - city
 *         - postalCode
 *         - country
 *       properties:
 *         fullName:
 *           type: string
 *         phone:
 *           type: string
 *         street:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         postalCode:
 *           type: string
 *         country:
 *           type: string
 *     OrderItem:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *         quantity:
 *           type: integer
 *         price:
 *           type: number
 *     PaymentMethod:
 *       type: object
 *       properties:
 *         cardType:
 *           type: string
 *         cardHolder:
 *           type: string
 *         cardNumber:
 *           type: string
 *         expiryDate:
 *           type: string
 *         cvv:
 *           type: string
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalPrice:
 *           type: number
 *         address:
 *           $ref: '#/components/schemas/OrderAddress'
 *         status:
 *           type: string
 *           enum: [Pending, Shipped, Delivered]
 *         createdAt:
 *           type: string
 *           format: date-time
 *     OrderWithPayment:
 *       allOf:
 *         - $ref: '#/components/schemas/Order'
 *         - type: object
 *           properties:
 *             paymentMethods:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaymentMethod'
 */
