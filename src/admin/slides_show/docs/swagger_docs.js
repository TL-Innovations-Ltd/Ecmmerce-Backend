/**
 * @swagger
 * tags:
 *   name: Slideshows
 *   description: Slideshow management operations
 */

/**
 * @swagger
 * /admin/slide/slideshows:
 *   post:
 *     summary: Create or Update a Slideshow
 *     description: Create a new slideshow or update an existing one
 *     tags: [Slideshows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SlideshowInput'
 *           example:
 *             customerId: customer123
 *             title: LIMI Lighting Solutions
 *             subtitle: Custom presentation for John Doe
 *             slides:
 *               - id: slide1
 *                 layout: media-text-split
 *                 media:
 *                   type: video
 *                   urls: [/videos/limi_intro.mp4]
 *                   position: left
 *                 text:
 *                   heading: Smart Living
 *                   subheading: Personalized for You
 *                   description: Control light & mood with one touch.
 *                   bullets: 
 *                     - Ambient modes
 *                     - App Control
 *                     - Modular Design
 *                   alignment: right
 *                   verticalPosition: center
 *                   showHeading: true
 *                   showSubheading: true
 *                   showDescription: true
 *                   showBullets: true
 *                 appearance:
 *                   theme: charleston
 *                   backgroundColor: '#2B2D2F'
 *                   overlayDarken: true
 *                   padding: 2rem
 *                 meta:
 *                   index: 0
 *                   status: published
 *     responses:
 *       200:
 *         description: Slideshow saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SlideshowResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error creating/updating slideshow
 */

/**
 * @swagger
 * /admin/slide/slideshows/{id}:
 *   get:
 *     summary: Get Slideshow by ID
 *     description: Retrieve a specific slideshow by its unique identifier
 *     tags: [Slideshows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the slideshow
 *     responses:
 *       200:
 *         description: Slideshow retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SlideshowResponse'
 *       404:
 *         description: Slideshow not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Slideshow not found
 *   delete:
 *     summary: Delete Slideshow
 *     description: Remove a specific slideshow by its unique identifier
 *     tags: [Slideshows]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the slideshow to delete
 *     responses:
 *       200:
 *         description: Slideshow deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Slideshow deleted successfully
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error deleting slideshow
 */

/**
 * @swagger
 * /admin/slide/customers/{customerId}/slideshows:
 *   get:
 *     summary: Get Slideshows by Customer ID
 *     description: Retrieve all slideshows for a specific customer
 *     tags: [Slideshows]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the customer
 *     responses:
 *       200:
 *         description: Slideshows retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SlideshowResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error retrieving slideshows
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SlideshowInput:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Optional ID for updating existing slideshow
 *         customerId:
 *           type: string
 *           required: true
 *         title:
 *           type: string
 *           required: true
 *         subtitle:
 *           type: string
 *         slides:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 required: true
 *               layout:
 *                 type: string
 *                 required: true
 *               media:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                   urls:
 *                     type: array
 *                     items:
 *                       type: string
 *                   position:
 *                     type: string
 *               text:
 *                 type: object
 *                 properties:
 *                   heading:
 *                     type: string
 *                   subheading:
 *                     type: string
 *                   description:
 *                     type: string
 *                   bullets:
 *                     type: array
 *                     items:
 *                       type: string
 *                   alignment:
 *                     type: string
 *                   verticalPosition:
 *                     type: string
 *                   showHeading:
 *                     type: boolean
 *                   showSubheading:
 *                     type: boolean
 *                   showDescription:
 *                     type: boolean
 *                   showBullets:
 *                     type: boolean
 *               appearance:
 *                 type: object
 *                 properties:
 *                   theme:
 *                     type: string
 *                   backgroundColor:
 *                     type: string
 *                   overlayDarken:
 *                     type: boolean
 *                   padding:
 *                     type: string
 *               meta:
 *                 type: object
 *                 properties:
 *                   index:
 *                     type: number
 *                   status:
 *                     type: string
 *     SlideshowResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Slideshow saved successfully
 *         data:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             customerId:
 *               type: string
 *             title:
 *               type: string
 *             subtitle:
 *               type: string
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *             slides:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SlideshowInput/properties/slides/items'
 */