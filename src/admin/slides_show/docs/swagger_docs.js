/**
 * @swagger
 * tags:
 *   - name: Slideshows
 *     description: Slideshow management operations
 *   - name: Media
 *     description: Media upload and management operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Slideshow:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         customerId:
 *           type: string
 *         title:
 *           type: string
 *         subtitle:
 *           type: string
 *         slides:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Slide'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     Slide:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         layout:
 *           type: string
 *         media:
 *           $ref: '#/components/schemas/Media'
 *         text:
 *           $ref: '#/components/schemas/TextContent'
 *         appearance:
 *           $ref: '#/components/schemas/Appearance'
 *         meta:
 *           $ref: '#/components/schemas/Meta'
 *     Media:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           enum: [image, video]
 *         urls:
 *           type: array
 *           items:
 *             type: string
 *         position:
 *           type: string
 *     TextContent:
 *       type: object
 *       properties:
 *         heading:
 *           type: string
 *         subheading:
 *           type: string
 *         description:
 *           type: string
 *         bullets:
 *           type: array
 *           items:
 *             type: string
 *         alignment:
 *           type: string
 *         verticalPosition:
 *           type: string
 *         showHeading:
 *           type: boolean
 *         showSubheading:
 *           type: boolean
 *         showDescription:
 *           type: boolean
 *         showBullets:
 *           type: boolean
 *     Appearance:
 *       type: object
 *       properties:
 *         theme:
 *           type: string
 *         backgroundColor:
 *           type: string
 *         overlayDarken:
 *           type: boolean
 *         padding:
 *           type: string
 *     Meta:
 *       type: object
 *       properties:
 *         index:
 *           type: number
 *         status:
 *           type: string
 *     MediaUploadResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         urls:
 *           type: array
 *           items:
 *             type: string
 *         public_ids:
 *           type: array
 *           items:
 *             type: string
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
 *             $ref: '#/components/schemas/Slideshow'
 *           example:
 *             customerId: customer123
 *             title: LIMI Lighting Solutions
 *             subtitle: Custom presentation for John Doe
 *             slides:
 *               - id: slide1
 *                 layout: media-text-split
 *                 media:
 *                   type: video
 *                   urls: ["https://res.cloudinary.com/demo/video/upload/sample.mp4"]
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Slideshow saved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Slideshow'
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
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Slideshow'
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
 *                     $ref: '#/components/schemas/Slideshow'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/slide/upload-media:
 *   post:
 *     summary: Upload media files to Cloudinary
 *     description: Upload one or more media files (images/videos) to Cloudinary storage
 *     tags: [Media]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Media uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MediaUploadResponse'
 *       400:
 *         description: No files were uploaded or invalid file type
 *       500:
 *         description: Error uploading media
 */

/**
 * @swagger
 * /admin/slide/slideshows_images:
 *   get:
 *     summary: Get all slideshow images
 *     description: Retrieve a list of all images used in slideshows
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: List of slideshow images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 format: uri
 */

/**
 * @swagger
 * /admin/slide/limi_bussiness_card_images:
 *   get:
 *     summary: Get limited business card images
 *     description: Retrieve a limited set of business card images
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: List of business card images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 format: uri
 */

/**
 * @swagger
 * /admin/slide/products_images:
 *   get:
 *     summary: Get all product images
 *     description: Retrieve a list of all product images
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: List of product images
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 format: uri
 */
