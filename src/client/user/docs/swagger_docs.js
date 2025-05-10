/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication, profile management, and payment methods
 */

/**
 * @swagger
 * /client/user/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request or user already exists
 */

/**
 * @swagger
 * /client/user/login:
 *   post:
 *     summary: Login user and get JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Invalid credentials or missing fields
 */

/**
 * @swagger
 * /client/user/profile:
 *   get:
 *     summary: Get current user profile (protected)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized, invalid or missing token
 *
 *   put:
 *     summary: Update user profile (phone, address, payment methods)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               address:
 *                 $ref: '#/components/schemas/UserAddress'
 *               paymentMethods:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/PaymentMethod'
 *               emailNotification:
 *                 type: boolean
 *                 description: Enable or disable email notifications
 *               smsNotification:
 *                 type: boolean
 *                 description: Enable or disable SMS notifications
 *               appNotification:
 *                 type: boolean
 *                 description: Enable or disable app notifications
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request or invalid input
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserAddress:
 *       type: object
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
 */
