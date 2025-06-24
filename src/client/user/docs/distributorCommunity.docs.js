/**
 * @swagger
 * tags:
 *   name: Distributor
 *   description: Distributor contact management
 * 
 * @swagger
 * tags:
 *   name: Community
 *   description: Community subscription management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DistributorContact:
 *       type: object
 *       required:
 *         - name
 *         - company
 *         - email
 *         - phoneNumber
 *         - country
 *         - privacyPolicy
 *       properties:
 *         name:
 *           type: string
 *           description: Full name of the distributor
 *         company:
 *           type: string
 *           description: Company name
 *         contactName:
 *           type: string
 *           description: Contact person's name
 *         title:
 *           type: string
 *           description: Job title
 *         email:
 *           type: string
 *           format: email
 *           description: Contact email
 *         phoneNumber:
 *           type: string
 *           description: Contact phone number
 *         country:
 *           type: string
 *           description: Country of operation
 *         experience:
 *           type: string
 *           description: Years of experience in distribution
 *         message:
 *           type: string
 *           description: Additional message
 *         privacyPolicy:
 *           type: boolean
 *           description: Must be true to accept privacy policy
 * 
 *     CommunitySubscription:
 *       type: object
 *       required:
 *         - email
 *         - communityType
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Subscriber's email address
 *         communityType:
 *           type: string
 *           enum: [LIMI_Club, The_Luminaries, LIMI_Collective]
 *           description: Type of community to subscribe to
 * 
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           additionalProperties: true
 */

/**
 * @swagger
 * /api/user/distributor/contact:
 *   post:
 *     summary: Submit a new distributor contact form
 *     tags: [Distributor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DistributorContact'
 *     responses:
 *       201:
 *         description: Distributor contact form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - User not authenticated
 * 
 *   get:
 *     summary: Get all distributor contacts for the authenticated user
 *     tags: [Distributor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of distributor contacts
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
 *                     $ref: '#/components/schemas/DistributorContact'
 *       401:
 *         description: Unauthorized - User not authenticated
 */

/**
 * @swagger
 * /api/user/community/subscribe:
 *   post:
 *     summary: Subscribe to a community
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommunitySubscription'
 *     responses:
 *       201:
 *         description: Successfully subscribed to the community
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid input data or already subscribed
 *       401:
 *         description: Unauthorized - User not authenticated
 * 
 * /api/user/community/subscriptions:
 *   get:
 *     summary: Get all community subscriptions (Admin only)
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all community subscriptions
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
 *                     $ref: '#/components/schemas/CommunitySubscription'
 *       401:
 *         description: Unauthorized - Admin access required
 */

