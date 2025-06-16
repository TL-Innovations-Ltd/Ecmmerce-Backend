/**
 * @swagger
 * components:
 *   schemas:
 *     DistributorContact:
 *       type: object
 *       required:
 *         - name
 *         - company
 *         - contactName
 *         - title
 *         - email
 *         - phoneNumber
 *         - country
 *         - experience
 *         - message
 *         - privacyPolicy
 *       properties:
 *         name:
 *           type: string
 *           description: Full name of the contact person
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
 *           description: Contact email address
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
 *           description: Additional message or inquiry
 *         privacyPolicy:
 *           type: boolean
 *           description: Must be true to accept privacy policy
 *     DistributorContactResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/DistributorContact'
 */

/**
 * @swagger
 * tags:
 *   - name: Distributor
 *     description: Distributor contact endpoints
 */

/**
 * @swagger
 * /api/user/distributor/contact:
 *   post:
 *     summary: Submit a new distributor contact form
 *     tags: [Distributor]
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
 *               $ref: '#/components/schemas/DistributorContactResponse'
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /api/user/distributor/contacts:
 *   get:
 *     summary: Get all distributor contacts (Admin only)
 *     tags: [Distributor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for name, company, email, or phone number
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date (YYYY-MM-DD)
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, name, company, email]
 *         description: Field to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
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
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *       401:
 *         description: Unauthorized - Admin access required
 */
