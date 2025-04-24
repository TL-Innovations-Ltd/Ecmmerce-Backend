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
 *     summary: Get the current user's order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
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
 *           $ref: '#/components/schemas/Product'
 *           description: Full product details
 *         quantity:
 *           type: integer
 *         price:
 *           type: number
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         price:
 *           type: number
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               public_id:
 *                 type: string
 *         details:
 *           type: array
 *           items:
 *             type: string
 *         featuredProduct:
 *           type: boolean
 *         newProduct:
 *           type: boolean
 *         stock:
 *           type: integer
 *           description: Available stock for the product
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 */