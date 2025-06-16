/**

/**
 * @swagger
 * /admin/products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
 *               - title
 *               - description
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               details:
 *                 type: array
 *                 items:
 *                   type: string
 *               featuredProduct:
 *                 type: boolean
 *                 default: false
 *               newProduct:
 *                 type: boolean
 *                 default: false
 *               stock:
 *                 type: integer
 *                 description: Available stock for the product
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Product images (multiple allowed)
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *         description: Invalid input or error
 */

/**
 * @swagger
 * /admin/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               details:
 *                 type: array
 *                 items:
 *                   type: string
 *               featuredProduct:
 *                 type: boolean
 *               newProduct:
 *                 type: boolean
 *               stock:
 *                 type: integer
 *                 description: Available stock for the product
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Product images (multiple allowed)
 *               remove_img:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     public_id:
 *                       type: string
 *                 description: Images to remove (Cloudinary info)
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input or error
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /admin/products/search:
 *   get:
 *     summary: Search products by name, category, etc.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Partial or full product name (case-insensitive)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Exact category name
 *     responses:
 *       200:
 *         description: List of products matching search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LightConfig:
 *       type: object
 *       required:
 *         - name
 *         - config
 *         - user_id
 *       properties:
 *         name:
 *           type: string
 *           example: "Living Room Light"
 *           description: Name of the light configuration
 *         thumbnail:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               format: uri
 *               example: "https://example.com/images/light1.jpg"
 *             public_id:
 *               type: string
 *               example: "light1_thumbnail"
 *         config:
 *           type: object
 *           description: Configuration object for the light
 *           example:
 *             brightness: 80
 *             color: "#FF5733"
 *             mode: "warm"
 *         iframe:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of iframe URLs
 *           example: ["<iframe1>", "<iframe2>"]
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "60d21b4667d0d8992e610c85"
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
 */


