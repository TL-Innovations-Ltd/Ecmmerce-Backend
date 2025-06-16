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
 * 
 *     ContactForm:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - subject
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         subject:
 *           type: string
 *           example: "Inquiry about product"
 *         message:
 *           type: string
 *           example: "I would like to know more about your product."
 * 
 *     FavoriteProduct:
 *       type: object
 *       required:
 *         - productId
 *       properties:
 *         productId:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 */

/**
 * @swagger
 * /client/user/profile/picture:
 *   put:
 *     summary: Upload or update user's profile picture
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: profilePicture
 *         type: file
 *         description: The profile picture to upload
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 profilePicture:
 *                   type: string
 *                   format: uri
 *                   description: URL of the uploaded profile picture
 *       400:
 *         description: No file uploaded or invalid file type
 *       401:
 *         description: Unauthorized, invalid or missing token
 *
 *   delete:
 *     summary: Remove user's profile picture
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile picture removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized, invalid or missing token
 */

/**
 * @swagger
 * /client/user/favorites/add:
 *   post:
 *     summary: Add a product to user's favorites
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteProduct'
 *     responses:
 *       200:
 *         description: Product added to favorites successfully
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
 *         description: Product already in favorites or invalid product ID
 *       401:
 *         description: Unauthorized, invalid or missing token
 */

/**
 * @swagger
 * /client/user/favorites/remove:
 *   post:
 *     summary: Remove a product from user's favorites
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteProduct'
 *     responses:
 *       200:
 *         description: Product removed from favorites successfully
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
 *         description: Product not found in favorites or invalid product ID
 *       401:
 *         description: Unauthorized, invalid or missing token
 */

/**
 * @swagger
 * /client/user/contact:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactForm'
 *     responses:
 *       201:
 *         description: Contact form submitted successfully
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
 *         description: Missing required fields or invalid input
 *       401:
 *         description: Unauthorized, invalid or missing token
 */

/**
 * @swagger
 * /client/user/contact-messages:
 *   get:
 *     summary: Get all contact messages for the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's contact messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ContactForm'
 *       401:
 *         description: Unauthorized, invalid or missing token
 */
